import { TokenService } from '@core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'layout-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.less']
})
export class LayoutBasicComponent implements OnInit, OnDestroy {
  constructor(private http: HttpClient, private router: Router, private message: NzMessageService) { }

  currentTheme: 'light' | 'dark' = 'light';
  isCollapsed: boolean = false;
  isSmallScreen: boolean = false;
  isShowDrawer: boolean = false;
  rooterChange: Subscription | undefined; // 声明订阅对象
  menus = [
    {
      level: 1,
      title: '首页',
      icon: 'home',
      link: '/dashboard/v1'
    },
    {
      level: 1,
      title: '文章管理',
      icon: 'read',
      link: '/articles'
    },
    {
      level: 1,
      title: '用户管理',
      icon: 'team',
      link: '/usercenter'
    },
    {
      level: 1,
      title: '字典管理',
      icon: 'setting',
      open: false,
      children: [
        {
          level: 2,
          title: '标签库',
          icon: 'tags',
          link: '/setting/tags'
        },
        {
          level: 2,
          title: '创作者',
          icon: 'profile',
          link: '/setting/owners'
        },
      ]
    },
    {
      level: 1,
      title: '日志管理',
      icon: 'bug',
      link: '/logger'
    },
  ];
  // 退出登录
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

  watchScreen() {
    const width = document.body.clientWidth || document.body.offsetWidth;
    if (width <= environment.config.media.screen.minWidth) {
      this.isSmallScreen = true;
      this.listenRouterChange();
    } else {
      this.isSmallScreen = false;
    }
  }

  /**
   * 监听路由变化
   */
  listenRouterChange() {
    this.rooterChange = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isShowDrawer = false;
      }
    });
  }

  toggleCollapse() {
    if (this.isSmallScreen) {
      this.isShowDrawer = !this.isShowDrawer;
      return;
    }
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit() {
    this.watchScreen();
    window.onresize = () => {
      this.watchScreen();
    }
  }

  ngOnDestroy() {
    if (this.rooterChange) {
      this.rooterChange.unsubscribe();
    }
  }
}
