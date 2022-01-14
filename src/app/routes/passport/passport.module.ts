import { SharedModule } from '@shared';
import { NgModule } from '@angular/core';
import { TranslateLocalePipe } from '@core';

import { UserLockComponent } from './lock/lock.component';
import { UserLoginComponent } from './login/login.component';
import { UserPassPortComponent } from './base/passport.component';
import { PassportRoutingModule } from './passport-routing.module';

@NgModule({
  imports: [SharedModule, PassportRoutingModule],
  declarations: [UserLoginComponent, UserLockComponent, UserPassPortComponent, TranslateLocalePipe],
})
export class PassportModule { }
