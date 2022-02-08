import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'articles',
    loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule),
    data: { breadcrumb: '文章管理' }
  },
  {
    path: 'usercenter',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    data: { breadcrumb: '用户管理' }
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule),
    data: { breadcrumb: '字典管理' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {}
