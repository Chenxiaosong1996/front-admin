import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'passport-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.less']
})
export class UserLockComponent {
  f: FormGroup;

  get user(): any {
    return {}
  }

  constructor(
    fb: FormBuilder,
    private router: Router
  ) {
    this.f = fb.group({
      password: [null, Validators.required]
    });
  }

  submit(): void {
    for (const i in this.f.controls) {
      this.f.controls[i].markAsDirty();
      this.f.controls[i].updateValueAndValidity();
    }
    if (this.f.valid) {
      console.log('Valid!');
      console.log(this.f.value);
      this.router.navigate(['dashboard']);
    }
  }
}
