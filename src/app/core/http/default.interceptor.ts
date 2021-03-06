import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpResponseBase
} from '@angular/common/http';
import { defaultUrl } from '@core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable, of, throwError } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { catchError, mergeMap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TokenService } from '../auth/token.guard';
import { NzMessageService } from 'ng-zorro-antd/message';
import Track from './track.service';

const CODEMESSAGE: { [key: number]: string } = {
  0: '请求发起失败，请确保服务开启。',
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) { }

  private get http(): HttpClient {
    return this.injector.get(HttpClient);
  }

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }

  private goTo(url: string): void {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private checkStatus(ev: HttpResponseBase): void {
    if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
      return;
    }

    const errortext = CODEMESSAGE[ev.status] || ev.statusText;
    this.notification.error(`请求错误 ${ev.status}: ${ev.url}`, errortext);
  }

  private handleData(ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const track = new Track();
    track.send({ url: req.url, method: req.method, code: ev.status, body: JSON.stringify(req.body || ''), message: ev['message'] || ev.statusText, result: JSON.stringify(ev['body'] || '') })
    this.checkStatus(ev);
    // 业务处理：一些通用操作
    switch (ev.status) {
      case 200:
        // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
        // 则以下代码片断可直接适用
        if (ev instanceof HttpResponse) {
          const body = ev.body;
          if (body && body.code !== 200) {
            this.injector.get(NzMessageService).error(body.message || CODEMESSAGE[body.status]);
          } else {
            // 或者依然保持完整的格式
            return of(ev);
          }
        }
        break;
      case 401:
        TokenService.clear();
        this.notification.remove();
        this.notification.error(`未登录或登录已过期，请重新登录。`, ``);
        this.goTo(`${environment.loginUrl}?redirect=${location.pathname}`);
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn('未可知错误，可能是后端不支持跨域CORS或无效配置引起', ev);
        }
        break;
    }
    return of(ev);
  }

  private getAdditionalHeaders(headers?: HttpHeaders): { [name: string]: string } {
    const res: { [name: string]: string } = {};
    if (TokenService.check()) {
      res[TokenService.tokenname] = TokenService.get();
    }
    return res;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 统一加上服务端前缀
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      const { baseUrl } = defaultUrl();
      url = baseUrl + (baseUrl.endsWith('/') && url.startsWith('/') ? url.substring(1) : url);
    }

    const newReq = req.clone({ url, setHeaders: this.getAdditionalHeaders(req.headers) });
    return next.handle(newReq).pipe(
      mergeMap(ev => {
        // 允许统一对请求错误处理
        if (ev instanceof HttpResponseBase) {
          return this.handleData(ev, newReq, next);
        }
        // 若一切都正常，则后续操作
        return of(ev);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err, newReq, next))
    );
  }
}
