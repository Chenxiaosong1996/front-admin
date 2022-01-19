import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './list/list.component';
import { ArticlesShowComponent } from './show/show.component';
import { ArticlesEditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ArticlesListComponent },
  { path: 'show', component: ArticlesShowComponent },
  { path: 'add', component: ArticlesEditComponent },
  { path: 'edit/:id', component: ArticlesEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
