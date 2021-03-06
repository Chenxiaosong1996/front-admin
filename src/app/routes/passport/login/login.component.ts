import { TokenService } from '@core';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLoginComponent {
  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private message: NzMessageService
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
      remember: [true]
    });
  }

  // #region fields

  get userName(): AbstractControl {
    return this.form.get('userName')!;
  }
  get password(): AbstractControl {
    return this.form.get('password')!;
  }
  get mobile(): AbstractControl {
    return this.form.get('mobile')!;
  }
  get captcha(): AbstractControl {
    return this.form.get('captcha')!;
  }
  form: FormGroup;
  error = '';
  type = 0;
  loading = false;

  // #region get captcha

  count = 0;

  // #endregion

  switch({ index }: NzTabChangeEvent): void {
    this.type = index!;
  }

  getCaptcha(): void {
    if (this.mobile.invalid) {
      this.mobile.markAsDirty({ onlySelf: true });
      this.mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
  }

  // #endregion

  submit(): void {
    this.error = '';
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) {
        return;
      }
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) {
        return;
      }
    }

    // ????????????????????????HTTP?????????????????? [??????](https://ng-alain.com/auth/getting-started) ?????? Token
    // ??????????????????????????????????????????????????????????????????URL?????????`/login?_allow_anonymous=true` ????????????????????? Token ??????
    this.loading = true;
    this.cdr.detectChanges();
    this.http
      .post('/auth/login', {
        type: this.type,
        username: this.userName.value,
        password: this.password.value
      })
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe((res: any) => {
        if (res && res.success) {
          // ????????????Token??????
          // TODO: Mock expired value
          TokenService.set(res.data.token, Number(res.data.express) / 1000 / 60 / 60);
          // ???????????? StartupService ???????????????????????????????????????????????????????????????????????????????????????
          this.message.success('????????????!');
          this.route.queryParams.subscribe((res: any) => {
            if (res && res.redirect) {
              this.router.navigateByUrl(res.redirect);
            } else {
              this.router.navigateByUrl('');
            }
          })
        } else {
          this.error = res.msg;
          this.cdr.detectChanges();
        }
      });
  }

  // #region social

  open(type: string, openType: any = 'href'): void {
    let url = ``;
    let callback = ``;
    callback = `${location.origin}/passport/callback/${type}`;
    switch (type) {
      case 'auth0':
        url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(callback)}`;
        break;
      case 'github':
        url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(
          callback
        )}`;
        break;
    }
    location.href = url;
  }
}
