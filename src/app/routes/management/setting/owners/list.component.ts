import { finalize } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { OwnerEditModalComponent } from './edit.component';
import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-articles-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OwnersListComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private message: NzMessageService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.queryForm = this.fb.group({
      keyword: '',
      status: ''
    });
  }
  queryForm!: FormGroup;
  listOfData: any[] = [];
  loading: boolean = false;
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
      .get(`/dictionary/owner/list`, { params })
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
  // 添加数据
  addRow(id?: string, name?: string, code?: string) {
    const modal = this.modal.create({
      nzTitle: `${id ? '编辑' : '新增'}作者`,
      nzContent: OwnerEditModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: comp =>
        new Promise(resolve => {
          if (!comp.validateForm.get('name')?.value || !comp.validateForm.get('name')?.value.trim()) {
            this.message.error('请输入作者名称!');
            resolve(false);
            return;
          }
          if (!comp.validateForm.get('code')?.value || !comp.validateForm.get('code')?.value.trim()) {
            this.message.error('请输入代号!');
            resolve(false);
            return;
          }
          this.http.post(`/dictionary/owner/${id ? 'update' : 'create'}`, { id, name: comp.validateForm.get('name')?.value, code: comp.validateForm.get('code')?.value }).subscribe((res: any) => {
            if (res && res.success) {
              this.message.success(`${id ? '编辑' : '新增'}成功!`);
              this.loadData();
              resolve();
            } else {
              resolve(false);
            }
          });
        })
    });
    if (id) {
      const instance = modal.getContentComponent();
      modal.afterOpen.subscribe(() => {
        instance.validateForm.get('name')?.setValue(name);
        instance.validateForm.get('code')?.setValue(code);
      });
    }
  }
  // 禁用/启用
  enableRow(id: string, enable: string | number) {
    this.http.post('/dictionary/owner/updatestatus', { id, status: enable == '0' ? '1' : '0' }).subscribe((res: any) => {
      if (res && res.success) {
        this.message.success(`${enable == '0' ? '启用' : '禁用'}成功!`);
        this.loadData();
      }
    });
  }
  // 删除数据
  deleteRow(id: string) {
    this.http.post('/dictionary/owner/delete', { id }).subscribe((res: any) => {
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
