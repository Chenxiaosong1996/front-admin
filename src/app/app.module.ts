import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { RoutesModule } from './routes/routes.module';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { DefaultInterceptor } from './core/http/default.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RoutesModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    NzNotificationModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: NzMessageService },
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
