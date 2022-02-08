import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'tag-edit-modal',
  template: `
    <form nz-form [formGroup]="validateForm">
      <nz-form-item>
        <nz-form-label [nzSpan]="5" nzFor="name">标签名</nz-form-label>
        <nz-form-control [nzSpan]="12" nzErrorTip="请输入标签名">
          <input id="name" type="text" nz-input formControlName="name" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class TagEditModalComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private modal: NzModalRef) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null]
    });
  }
}
