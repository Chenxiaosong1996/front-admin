import { SharedModule } from '@shared';
import { NgModule } from '@angular/core';
import { TagsListComponent } from './tags/list.component';
import { TagEditModalComponent } from './tags/edit.component';
import { OwnersListComponent } from './owners/list.component';
import { SettingRoutingModule } from './setting-routing.module';
import { OwnerEditModalComponent } from './owners/edit.component';

@NgModule({
  imports: [
    SharedModule,
    SettingRoutingModule,
  ],
  declarations: [TagsListComponent, TagEditModalComponent, OwnersListComponent, OwnerEditModalComponent]
})
export class SettingModule { }
