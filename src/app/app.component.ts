import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // 初始化，隐藏加载动画
    window.onload = () => {
      const preloader = document.querySelector('.preloader');
      preloader?.classList.remove('preloader');
      preloader?.classList.add('preloader-hidden');
    }
  }
}
