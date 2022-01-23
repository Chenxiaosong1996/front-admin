import { finalize } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles-show',
  templateUrl: './show.component.html',
  styles: [
    `
      nz-page-header {
        margin: -20px;
      }
      ::ng-deep .editormd-preview-active {
        padding: 20px !important;
      }
    `
  ]
})
export class ArticlesShowComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  articleId: string = '';
  loading: boolean = true;
  articleDetail: any = null;
  ownersObj: object = {};
  errorFallback: string = 'https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg';

  ngOnInit() {
    this.initDictionary();
    this.route.params.subscribe((res: any) => {
      if (res.id) {
        this.articleId = res.id;
        this.getArticleDetail();
      }
    });
  }

  // 加载字典库数据
  async initDictionary() {
    await this.http.get('/dictionary/owner/list').subscribe((res: any) => {
      if (res && res.success) {
        res.data.forEach((item: any) => {
          this.ownersObj[item.code] = item.name;
        });
      }
    });
  }

  // 获取详情数据
  getArticleDetail() {
    this.http
      .get(`/article/blogarticle/detail/${this.articleId}`)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe((res: any) => {
        if (res && res.success) {
          this.articleDetail = res.data;
          this.articleDetail.tags = res.data.tags.split(',').filter((item: string) => item);
        }
      });
  }
}
