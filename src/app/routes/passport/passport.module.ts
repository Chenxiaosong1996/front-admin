import { SharedModule } from '@shared';
import { NgModule } from '@angular/core';
import { TranslateLocalePipe } from '@core';

import { CallbackComponent } from './callback.component';
import { UserLockComponent } from './lock/lock.component';
import { UserLoginComponent } from './login/login.component';
import { PassportRoutingModule } from './passport-routing.module';

const COMPONENTS = [UserLoginComponent, UserLockComponent, CallbackComponent, TranslateLocalePipe];

@NgModule({
  imports: [SharedModule, PassportRoutingModule],
  declarations: [...COMPONENTS]
})
export class PassportModule {}
