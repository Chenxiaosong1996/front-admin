import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-articles-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesListComponent implements OnInit {
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef, private message: NzMessageService) {
    this.queryForm = this.fb.group({
      keyword: '',
      owner: '',
    });
  }
  queryForm!: FormGroup;
  ownersObj: object = {};
  ownersList: any[] = [];
  listOfData: any[] = [];
  loading: boolean = false;
  errorFallback: string = 'https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg';
  // 查询文章列表
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
    this.http.get(`/article/blogarticle/list`, { params })
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe((res: any) => {
        if (res && res.success) {
          this.listOfData = res.data.map((item: any) => {
            item.tags = item.tags.split(',').filter((c: any) => c);
            return item;
          });
        } else {
          this.listOfData = [];
        }
      })
  }
  // 添加文章
  addRow() {
    this.router.navigateByUrl('/articles/add');
  }
  // 删除文章
  deleteRow(id: string) {
    this.http.post('/article/blogarticle/delete', { id })
      .subscribe((res: any) => {
        if (res && res.success) {
          this.message.success('删除成功!');
          this.loadData();
        }
      })
  }
  // 加载字典库数据
  initDictionary() {
    this.http.get('/dictionary/owner/list').subscribe((res: any) => {
      if (res && res.success) {
        res.data.forEach((item: any) => {
          this.ownersObj[item.code] = item.name;
        });
        this.ownersList = res.data;
      }
    });
  }
  // 重置查询
  resetForm(): void {
    this.queryForm.reset();
    this.loadData();
  }

  ngOnInit(): void {
    this.initDictionary();
    this.loadData();
  }
}
