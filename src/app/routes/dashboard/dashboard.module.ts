import { SharedModule } from '@shared';
import { NgModule } from '@angular/core';
import { DashboardV1Component } from './v1/v1.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
  ],
  declarations: [DashboardV1Component]
})
export class DashboardModule { }
