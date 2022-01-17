import { TokenService } from '@core';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'passport-lock',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less']
})

export class UserPassPortComponent implements OnInit {

  constructor(private router: Router) { }

  checkToken() {
    if (TokenService.check()) {
      this.router.navigateByUrl('');
    }
  }

  ngOnInit(): void {
    this.checkToken();
  }
}