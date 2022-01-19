import { SharedModule } from '@shared';
import { NgModule } from '@angular/core';
import { ArticlesListComponent } from './list/list.component';
import { ArticlesShowComponent } from './show/show.component';
import { ArticlesEditComponent } from './edit/edit.component';
import { ArticlesRoutingModule } from './articles-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ArticlesRoutingModule,
  ],
  declarations: [ArticlesListComponent, ArticlesShowComponent, ArticlesEditComponent]
})
export class ArticlesModule { }
