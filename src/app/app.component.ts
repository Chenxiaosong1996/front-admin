import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    // 初始化，隐藏加载动画
    const preloader = document.querySelector('.preloader');
    preloader?.classList.remove('preloader');
    preloader?.classList.add('preloader-hidden');
  }
}
