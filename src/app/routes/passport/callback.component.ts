import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-callback',
  template: ``,
  providers: []
})
export class CallbackComponent implements OnInit {
  type = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    this.mockModel();
  }

  private mockModel(): void {
    const info = {
      token: '123456789',
      name: 'cipchk',
      email: `${this.type}@${this.type}.com`,
      id: 10000,
      time: +new Date()
    };
  }
}
