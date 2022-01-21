import { generateId } from '@shared';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-upload-img',
    template: `<div class="ant-upload ant-upload-select ant-upload-select-picture-card">
    <div class="ant-upload relative" [hidden]="fileUrl">
      <input accept="image/*" type="file" class="upload-input absolute" [id]="uploaderId" [placeholder]="placeholder" (change)="fileUpload($event)" />
      <div>
        <i nz-icon nzType="plus" nzTheme="outline"></i>
      </div>
    </div>
    <div class="upload-preview flex justify-center items-center relative" *ngIf="fileUrl">
      <img nz-image width="80px" height="80px" [nzSrc]="fileUrl" [nzFallback]="errorFallback" />

      <i nz-icon nzType="close-circle" nzTheme="outline" class="absolute upload-preview-close" (click)="remove()" ></i>
    </div>
  </div>`,
    styles: [
        `
      .upload-input {
        opacity: 0;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
      }
      .upload-preview {
        width: 100%;
        height: 100%;
      }
      .upload-preview-close {
        right: -10px;
        top: -10px;
        font-size: 20px;
      }
    `
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UploaderComponent),
            multi: true
        }
    ]
})
export class UploaderComponent implements ControlValueAccessor {
    uploaderId: string = '';
    fileUrl: string = '';

    get url() {
        return this.fileUrl;
    }

    set url(value: string) {
        this.fileUrl = value;
        this.onChange(this.fileUrl);
    }

    errorFallback: string = 'https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg';

    @Input() disabled: boolean = false;
    @Input() max: number = 2 * 1024 * 1024;
    @Input() type: string[] = ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'];
    @Input() placeholder: string = '请上传附件';

    private onChange = (_: any) => { };
    private onTouched = () => { };

    constructor(private http: HttpClient, private message: NzMessageService) {
        this.uploaderId = `UL${generateId(6, 16)}`;
    }

    writeValue(obj: string): void {
        this.url = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    fileUpload(ev: any) {
        const file = ev.target.files[0];
        // 校验文件格式以及大小
        if (file.size > this.max) {
            this.message.warning(`上传文件最大限制 ${this.max / 1024 / 1024}M !`);
            this.clearFile();
            return;
        }
        const imgList = this.type.map(t => t.toLowerCase());
        const nameList = file.name.split('.');
        if (!imgList.includes(nameList[nameList.length - 1].toLowerCase())) {
            this.message.warning('上传文件格式错误!');
            this.clearFile();
            return;
        }
        const fd = new FormData();
        fd.append('count', '1');
        fd.append('name', file.name);
        fd.append('file', file);

        this.http.post('/fileOSS/singleuploader', fd).subscribe((res: any) => {
            this.clearFile();
            if (res && res.success) {
                this.url = environment.ossUrl + res.data.fileUrl;
            }
        });
    }

    clearFile() {
        const fileTarget: any = document.getElementById(this.uploaderId);
        fileTarget.value = null;
    }

    remove() {
        this.url = '';
    }
}
