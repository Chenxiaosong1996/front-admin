import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesListComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) { }
  listOfData: any[] = [];
  loading: boolean = false;
  errorFallback: string = 'https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg';

  private loadData() {
    this.loading = true;
    this.http.get(`/article/list?owner=cc`)
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
      })
  }

  addRow() {
    this.router.navigateByUrl('/articles/add');
  }

  deleteRow(id: string) { }

  ngOnInit(): void {
    this.loadData();
  }
}
