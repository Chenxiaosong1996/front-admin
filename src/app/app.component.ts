import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  title = 'front-admin';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.http.post('/user/login', {
    //   username: 'root',
    //   password: 'root123456'
    // })
    //   .subscribe((res) => {
    //     console.log(res)
    //   })
  }
}
