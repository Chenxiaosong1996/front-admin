import { SharedModule } from '@shared';
import { NgModule } from '@angular/core';
import { RouteRoutingModule } from './routes-routing.module';

@NgModule({
    imports: [
        SharedModule,
        RouteRoutingModule
    ],
    declarations: [],
    exports: []
})
export class RoutesModule { }
