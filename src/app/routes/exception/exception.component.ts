import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExceptionComponent {

  get type(): any {
    return this.route.snapshot.data['type'];
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  pathHome() {
    console.log(1)
    this.router.navigateByUrl('/')
  }
}
