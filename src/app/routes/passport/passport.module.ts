import { SharedModule } from '@shared';
import { NgModule } from '@angular/core';
import { TranslateLocalePipe } from '@core';

import { UserLockComponent } from './lock/lock.component';
import { UserLoginComponent } from './login/login.component';
import { PassportRoutingModule } from './passport-routing.module';

const COMPONENTS = [UserLoginComponent, UserLockComponent, TranslateLocalePipe];

@NgModule({
  imports: [SharedModule, PassportRoutingModule],
  declarations: [...COMPONENTS]
})
export class PassportModule {}
