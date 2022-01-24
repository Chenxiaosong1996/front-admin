import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutMenuComponent } from './partial/menu.component';
import { LayoutBasicComponent } from './basic/basic.component';
import { LayoutBlankComponent } from './blank/blank.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

const COMPONENTS = [LayoutMenuComponent, LayoutBasicComponent, LayoutBlankComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzIconModule,
    NzMenuModule,
    NzDrawerModule,
    NzLayoutModule,
    NzAvatarModule,
    NzDropDownModule,
    NzBreadCrumbModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class LayoutModule { }
