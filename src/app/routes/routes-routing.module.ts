import { SimpleGuard } from '@core';
import { NgModule } from '@angular/core';
import { environment } from '@env/environment';
import { RouterModule, Routes } from '@angular/router';
// layout
import { LayoutBasicComponent } from '../layout/basic/basic.component';
// import { LayoutBlankComponent } from '../layout/blank/blank.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [SimpleGuard],
    canActivateChild: [SimpleGuard],
    data: {},
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { breadcrumb: '' }
      },
      {
        path: '',
        loadChildren: () => import('./management/management.module').then(m => m.ManagementModule),
        data: { breadcrumb: '' }
      },
    ]
  },
  { path: '', loadChildren: () => import('./passport/passport.module').then(m => m.PassportModule) },
  { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
  { path: '**', redirectTo: 'exception/404' }
];

@NgModule({
  providers: [],
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      useHash: environment.useHash,
      onSameUrlNavigation: 'reload',
      // preloadingStrategy:  // 预先加载模块
      scrollPositionRestoration: 'top',
      scrollOffset: [0, 0]
    })
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
