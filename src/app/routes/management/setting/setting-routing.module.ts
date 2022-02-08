import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsListComponent } from './tags/list.component';
import { OwnersListComponent } from './owners/list.component';

const routes: Routes = [
  { path: '', redirectTo: 'tags', pathMatch: 'full' },
  { path: 'tags', component: TagsListComponent, data: { breadcrumb: '标签库' } },
  { path: 'owners', component: OwnersListComponent, data: { breadcrumb: '创作者' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
