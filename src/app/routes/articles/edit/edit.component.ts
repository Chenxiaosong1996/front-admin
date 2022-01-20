import { MyValidators } from '@shared';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-articles-edit',
    templateUrl: './edit.component.html'
})
export class ArticlesEditComponent implements OnInit {
    articleId: string = '';
    validateForm: FormGroup;
    tagsList: { name: string; code: string }[] = [];
    ownersList: { name: string; code: string }[] = [];
    editor: any;
    editorSample: any;
    editorLoaded: boolean = false;

    constructor(private fb: FormBuilder, private http: HttpClient, private message: NzMessageService, private route: ActivatedRoute) {
        const { required, maxLength, minLength } = MyValidators;
        this.validateForm = this.fb.group({
            title: ['', [required, minLength(5), maxLength(30)]],
            subtitle: ['', [required, minLength(5), maxLength(50)]],
            description: ['', [required, minLength(5), maxLength(200)]],
            content: ['', [required, minLength(5)]],
            tags: [[]],
            owner: ['', [required]],
            cover: ['']
        });
    }

    // current locale is key of the nzAutoTips
    // if it is not found, it will be searched again with `default`
    autoTips: Record<string, Record<string, string>> = {
        'zh-cn': {
            required: '必填项'
        },
        en: {
            required: 'Input is required'
        },
        default: {
            email: '邮箱格式不正确/The input is not valid email'
        }
    };

    // 标签变更时
    tagModelChange(tag: string[]) {
        // 不管是新增或是删除，直接取最后一项使用
        if (tag && tag.length) {
            const newTag = tag[tag.length - 1];
            const isRepeat = this.tagsList.find(item => item.name == newTag);
            if (!isRepeat) {
                this.http.post('/dictionary/tag/create', { name: newTag }).subscribe((res: any) => {
                    if (res && res.success) {
                        this.tagsList.push(res.data);
                    }
                });
            }
        }
    }

    // 获取字典数据 - 标签、创作者
    initDictionary() {
        this.http.get('/dictionary/tag/list').subscribe((res: any) => {
            if (res && res.success) {
                this.tagsList = res.data;
            } else {
                this.tagsList = [];
            }
        });

        this.http.get('/dictionary/owner/list').subscribe((res: any) => {
            if (res && res.success) {
                this.ownersList = res.data;
            } else {
                this.ownersList = [];
            }
        });
    }

    submitForm(): void {
        if (this.validateForm.valid) {
            if (!this.articleId) {
                this.http.post('/article/blogarticle/create', { ...this.validateForm.value, tags: this.validateForm.value.tags.join(',') }).subscribe((res: any) => {
                    if (res && res.success) {
                        this.message.success('真棒，成功创建一篇文章!');
                        history.back();
                    } else {
                        this.message.error(res.message);
                    }
                });
            } else {
                this.http.post('/article/blogarticle/update', { id: this.articleId, ...this.validateForm.value, tags: this.validateForm.value.tags.join(',') }).subscribe((res: any) => {
                    if (res && res.success) {
                        this.message.success('文章编辑成功!');
                        history.back();
                    } else {
                        this.message.error(res.message);
                    }
                });
            }
        } else {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    resetForm(e: MouseEvent): void {
        e.preventDefault();
        this.validateForm.reset();
        for (const key in this.validateForm.controls) {
            if (this.validateForm.controls.hasOwnProperty(key)) {
                this.validateForm.controls[key].markAsPristine();
                this.validateForm.controls[key].updateValueAndValidity();
            }
        }
    }

    // 获取详情数据
    getArticleDetail() {
        this.http.get(`/article/blogarticle/detail/${this.articleId}`)
            .subscribe((res: any) => {
                if (res && res.success) {
                    this.validateForm.get('title')?.setValue(res.data.title);
                    this.validateForm.get('subtitle')?.setValue(res.data.subtitle);
                    this.validateForm.get('description')?.setValue(res.data.description);
                    this.validateForm.get('content')?.setValue(res.data.content);
                    this.validateForm.get('tags')?.setValue(res.data.tags.split(',').filter((item: string) => item));
                    this.validateForm.get('owner')?.setValue(res.data.owner);
                    this.validateForm.get('cover')?.setValue(res.data.cover);
                }
            })
    }
    ngOnInit(): void {
        this.initDictionary();

        this.route.params.subscribe((res: any) => {
            if (res.id) {
                this.articleId = res.id;
                this.getArticleDetail();
            }
        })
    }

    fileUpload(ev: any) {
        console.log(ev.target.files)
        const file = ev.target.files[0];

        const fd = new FormData();
        fd.append('count', '1');
        fd.append('name', file.name);
        fd.append('file', file);

        this.http.post('/fileOSS/singleuploader', fd)
            .subscribe(res => {
                console.log(res)
            })
    }
}
