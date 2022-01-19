import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './list/list.component';
import { ArticlesShowComponent } from './show/show.component';
import { ArticlesEditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ArticlesListComponent, data: { breadcrumb: '列表' } },
  { path: 'show', component: ArticlesShowComponent, data: { breadcrumb: '详情' } },
  { path: 'add', component: ArticlesEditComponent, data: { breadcrumb: '新增' } },
  { path: 'edit/:id', component: ArticlesEditComponent, data: { breadcrumb: '编辑' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
