import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private message: NzMessageService
  ) {
    this.queryForm = this.fb.group({
      keyword: '',
      status: ''
    });
  }
  queryForm!: FormGroup;
  listOfData: any[] = [];
  loading: boolean = false;
  errorFallback: string = 'https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg';
  // 查询数据列表
  loadData() {
    // 参数检查
    const params = {};
    for (let key in this.queryForm.value) {
      if (this.queryForm.value[key] && this.queryForm.value[key].trim()) {
        params[key] = this.queryForm.value[key].trim();
      }
    }
    // 发起请求
    this.loading = true;
    this.http
      .get(`/user/list`, { params })
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe((res: any) => {
        if (res && res.success) {
          this.listOfData = res.data;
        } else {
          this.listOfData = [];
        }
      });
  }
  // 禁用/启用
  enableRow(userId: string, enable: string | number) {
    this.http.post('/user/updatestatus', { userId, status: enable == '0' ? '1' : '0' }).subscribe((res: any) => {
      if (res && res.success) {
        this.message.success(`${enable == '0' ? '启用' : '禁用'}成功!`);
        this.loadData();
      }
    });
  }
  // 删除数据
  deleteRow(userId: string) {
    this.http.post('/user/delete', { userId }).subscribe((res: any) => {
      if (res && res.success) {
        this.message.success('删除成功!');
        this.loadData();
      }
    });
  }
  // 重置查询
  resetForm(): void {
    this.queryForm.reset();
    this.loadData();
  }

  ngOnInit(): void {
    this.loadData();
  }
}
