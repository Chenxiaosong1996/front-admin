import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CallbackComponent } from './callback.component';
import { UserLockComponent } from './lock/lock.component';
import { UserLoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent,
    data: { title: '登录', titleI18n: 'app.login.login' }
  },
  {
    path: 'lock',
    component: UserLockComponent,
    data: { title: '锁屏', titleI18n: 'app.lock' }
  },
  // 单页不包裹Layout
  { path: 'passport/callback/:type', component: CallbackComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassportRoutingModule { }
