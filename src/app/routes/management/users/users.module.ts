import { SharedModule } from '@shared';
import { NgModule } from '@angular/core';
import { UsersListComponent } from './list/list.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
  ],
  declarations: [UsersListComponent]
})
export class UsersModule { }
