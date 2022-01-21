import { SharedModule } from '@shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutMenuComponent } from './partial/menu.component';
import { LayoutBasicComponent } from './basic/basic.component';
import { LayoutBlankComponent } from './blank/blank.component';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

const COMPONENTS = [LayoutMenuComponent, LayoutBasicComponent, LayoutBlankComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NzMenuModule,
    NzLayoutModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class LayoutModule { }
