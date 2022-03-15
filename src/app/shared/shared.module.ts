import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateTimePipe } from './pipe/time.pipe';
import { UploaderComponent } from './components/upload';
import { EditorMdComponent } from './components/editor.md';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';

// #region your componets & directives
const COMPONENTS: Array<Type<any>> = [UploaderComponent, EditorMdComponent];
const DIRECTIVES: Array<Type<any>> = [TranslateTimePipe];
// #endregion

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...SHARED_ZORRO_MODULES],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...SHARED_ZORRO_MODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class SharedModule { }
