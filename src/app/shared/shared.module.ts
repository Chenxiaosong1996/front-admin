import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateTimePipe } from './pipe/time';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';

// #region third libs
// import { NgxTinymceModule } from 'ngx-tinymce';
// import { UEditorModule } from 'ngx-ueditor';

const THIRDMODULES: Array<Type<any>> = [];
// #endregion

// #region your componets & directives
const COMPONENTS: Array<Type<any>> = [];
const DIRECTIVES: Array<Type<any>> = [TranslateTimePipe];
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class SharedModule { }
