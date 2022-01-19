import { MyValidators } from '@shared';
import { environment } from '@env/environment';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var editormd: any;

@Component({
    selector: 'app-articles-edit',
    templateUrl: './edit.component.html'
})
export class ArticlesEditComponent implements OnInit, AfterViewInit {
    articleId: string = '';
    validateForm: FormGroup;
    tagsList: { name: string; code: string }[] = [];
    ownersList: { name: string; code: string }[] = [];
    editor: any;

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
        this.validateForm.get('content')?.setValue(this.editor.getMarkdown());
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

                    this.initEditor(this.validateForm.value.content);
                }
            })
    }
    // 初始化编辑器
    initEditor(content: string = '') {
        this.editor = editormd('test-editormd', {
            width: '100%',
            height: 740,
            path: environment.config.obs.url + environment.config.editor.path,
            theme: 'dark',
            previewTheme: 'dark',
            editorTheme: 'pastel-on-dark',
            markdown: content,
            codeFold: true,
            placeholder: '请输入内容(支持markdown格式)',
            //syncScrolling : false,
            saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
            searchReplace: true,
            watch: false, // 关闭实时预览
            htmlDecode: 'style,script,iframe|on*', // 开启 HTML 标签解析，为了安全性，默认不开启
            toolbar: false, //关闭工具栏
            toolbarIcons: function () {
                //自定义工具栏，后面有详细介绍
                // return editormd.toolbarModes["mini"]; // full, simple, mini
                return environment.config.editor.toolbar;
            },
            //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
            emoji: true,
            taskList: true,
            tocm: false, // Using [TOCM]
            // tex: false, // 开启科学公式TeX语言支持，默认关闭
            // flowChart: false, // 开启流程图支持，默认关闭
            // sequenceDiagram: false, // 开启时序/序列图支持，默认关闭,
            //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
            //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
            //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
            //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
            //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
            imageUpload: true,
            imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
            imageUploadURL: './php/upload.php',
            onload: function () {
                // console.log("onload", this);
                //this.fullscreen();
                //this.unwatch();
                //this.watch().fullscreen();
                //this.setMarkdown("#PHP");
                //this.width("100%");
                //this.height(480);
                //this.resize("100%", 640);
            }
        });
    }

    ngOnInit(): void {
        this.initDictionary();
    }

    ngAfterViewInit(): void {
        this.route.params.subscribe((res: any) => {
            if (res.id) {
                this.articleId = res.id;
                this.getArticleDetail();
            } else {
                this.initEditor();
            }
        })
    }
}

// current locale is key of the MyErrorsOptions
