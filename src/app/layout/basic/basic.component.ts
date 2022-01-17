import { TokenService } from '@core';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'layout-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.less']
})
export class LayoutBasicComponent {
  currentTheme: 'light' | 'dark' = 'light';
  isCollapsed: boolean = false;
  menus = [
    {
      level: 1,
      title: '首页',
      icon: 'home',
      link: '/dashboard/v1'
    },
    {
      level: 1,
      title: 'Team Group',
      icon: 'team',
      open: false,
      children: [
        {
          level: 2,
          title: 'User 1',
          icon: 'user',
          link: '/dashboard/v2'
        },
        {
          level: 2,
          title: 'User 2',
          icon: 'user',
          link: '/dashboard/v3'
        }
      ]
    }
  ];

  constructor(private http: HttpClient, private router: Router, private message: NzMessageService) { }

  logout() {
    this.http
      .post('/user/logout', null)
      .subscribe((res: any) => {
        if (TokenService.check()) {
          TokenService.clear();
        }
        if (res && res.success) {
          this.message.success('注销成功!');
        }
        this.router.navigateByUrl(environment.loginUrl);
      })
  }
}
