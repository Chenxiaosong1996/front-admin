import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { ExceptionComponent } from './exception.component';
import { ExceptionRoutingModule } from './exception-routing.module';

@NgModule({
  imports: [CommonModule, NzButtonModule, NzCardModule, ExceptionRoutingModule],
  declarations: [ExceptionComponent]
})
export class ExceptionModule { }
