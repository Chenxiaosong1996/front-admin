import { MyValidators } from '@shared';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { environment } from '@env/environment';
declare var editormd: any;

@Component({
    selector: 'app-articles-edit',
    templateUrl: './edit.component.html',
})

export class ArticlesEditComponent implements AfterViewInit {
    validateForm: FormGroup;
    editor: any;
    @ViewChild('editorRef') editorRef: ElementRef | undefined;

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

    submitForm(): void {
        if (this.validateForm.valid) {
            console.log('submit', this.validateForm.value);
        } else {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    constructor(private fb: FormBuilder) {
        const { required, maxLength, minLength } = MyValidators;
        this.validateForm = this.fb.group({
            title: ['', [required, minLength(5), maxLength(30)]],
            subtitle: ['', [required, minLength(5), maxLength(50)]],
            description: ['', [required, minLength(5)]],
            content: ['', [required, minLength(5)]],
            tags: [''],
            owner: ['', [required]],
            cover: [''],
        });
    }

    ngAfterViewInit(): void {
        console.log(this.editorRef?.nativeElement)
        this.editor = editormd('test-editormd', {
            width: "100%",
            height: 740,
            path: environment.config.obs.url + environment.config.editor.path,
            theme: "dark",
            previewTheme: "dark",
            editorTheme: "pastel-on-dark",
            markdown: "",
            codeFold: true,
            //syncScrolling : false,
            saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
            searchReplace: true,
            watch: false,                // 关闭实时预览
            htmlDecode: "style,script,iframe|on*", // 开启 HTML 标签解析，为了安全性，默认不开启
            toolbar: false,             //关闭工具栏
            //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
            emoji: true,
            taskList: true,
            tocm: true, // Using [TOCM]
            tex: false, // 开启科学公式TeX语言支持，默认关闭
            flowChart: false, // 开启流程图支持，默认关闭
            sequenceDiagram: false, // 开启时序/序列图支持，默认关闭,
            //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
            //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
            //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
            //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
            //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
            imageUpload: true,
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL: "./php/upload.php",
            onload: function () {
                console.log("onload", this);
                //this.fullscreen();
                //this.unwatch();
                //this.watch().fullscreen();

                //this.setMarkdown("#PHP");
                //this.width("100%");
                //this.height(480);
                //this.resize("100%", 640);
            },
            toolbarIcons: function () {
                //自定义工具栏，后面有详细介绍
                // return editormd.toolbarModes["mini"]; // full, simple, mini
                return environment.config.editor.toolbar;
            },
        });
    }
}

// current locale is key of the MyErrorsOptions
