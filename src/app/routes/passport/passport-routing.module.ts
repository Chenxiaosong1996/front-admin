import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLockComponent } from './lock/lock.component';
import { UserLoginComponent } from './login/login.component';
import { UserPassPortComponent } from './base/passport.component';

const routes: Routes = [
  {
    path: 'passport',
    component: UserPassPortComponent,
    children: [
      {
        path: 'login',
        component: UserLoginComponent,
        data: { title: '登录' }
      },
      {
        path: 'lock',
        component: UserLockComponent,
        data: { title: '锁屏' }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassportRoutingModule { }
