import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutBasicComponent } from './basic/basic.component';
import { LayoutBlankComponent } from './blank/blank.component';

const COMPONENTS = [LayoutBasicComponent, LayoutBlankComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class LayoutModule { }
