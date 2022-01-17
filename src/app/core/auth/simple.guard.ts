import {
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivate,
    CanDeactivate,
    CanActivateChild,
    CanLoad,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from './token.guard';
import { environment } from '@env/environment';
import { Route } from '@angular/compiler/src/core';

@Injectable({ providedIn: 'root' })
export class SimpleGuard implements CanActivate, CanActivateChild, CanLoad, CanDeactivate<any> {
    constructor(
        private router: Router
    ) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // 权限控制逻辑如 是否登录/拥有访问权限
        if (TokenService.check()) {
            return true;
        }
        this.router.navigateByUrl(environment.loginUrl);
        return false;
    }
    // canDeactivate(
    //     component: NewsComponent,
    //     currentRoute: ActivatedRouteSnapshot,
    //     currentState: RouterStateSnapshot,
    //     nextState: RouterStateSnapshot) {
    //     console.log('canDeactivate');
    //     return true;
    // }
    canDeactivate() {
        // 离开本页面
        return true;
    }
    canActivateChild() {
        // 返回false则导航将失败/取消
        // 也可以写入具体的业务逻辑
        return true;
    }
    canLoad(route: Route) {
        // 是否可以加载路由
        return true;
    }
}
