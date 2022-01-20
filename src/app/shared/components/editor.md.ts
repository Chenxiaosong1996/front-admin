import { generateId } from '@shared';
import { environment } from '@env/environment';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AfterViewInit, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
declare const editormd: any;

@Component({
  selector: 'app-editor-md',
  template: `<div [id]="editorMdId"><textarea [placeholder]="placeholder" [(ngModel)]="editorContent"></textarea></div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorMdComponent),
      multi: true
    }
  ]
})
export class EditorMdComponent implements AfterViewInit, ControlValueAccessor {
  editorMdId: string = '';
  editorContent: string = '';

  @Input() theme: string = 'default';
  @Input() disabled: boolean = false;
  @Input() defaulted: 'markdown' | 'html' = 'markdown';
  @Input() placeholder: string = '请输入内容(支持markdown格式)';
  @Output() loaded = new EventEmitter<boolean>();
  @Output() changed = new EventEmitter<string>()

  private editorThemeList: string[] = [
    '3024-day',
    '3024-night',
    'ambiance',
    'ambiance-mobile',
    'base16-dark',
    'base16-light',
    'blackboard',
    'cobalt',
    'colorforth',
    'eclipse',
    'elegant',
    'erlang-dark',
    'lesser-dark',
    'mbo',
    'mdn-like',
    'midnight',
    'monokai',
    'neat',
    'neo',
    'night',
    'paraiso-dark',
    'paraiso-light',
    'pastel-on-dark',
    'rubyblue',
    'solarized',
    'the-matrix',
    'tomorrow-night-bright',
    'tomorrow-night-eighties',
    'twilight',
    'vibrant-ink',
    'xq-dark',
    'xq-light',
    'zenburn'
  ];

  // editormd 对象
  private markdownEditor: any;

  private editorDefaultConfig = {
    mode: 'gfm',
    name: '',
    value: '',
    theme: '',
    editorTheme: 'eclipse',
    previewTheme: '',
    markdown: '',
    appendMarkdown: '',
    width: '100%',
    height: '640',
    path: 'assets/plugins/editormd/lib/',
    pluginPath: '',
    delay: 300,
    autoLoadModules: true,
    watch: true,
    placeholder: 'Enjoy Markdown! coding now...',
    gotoLine: true,
    codeFold: true,
    autoHeight: false,
    autoFocus: true,
    autoCloseTags: true,
    searchReplace: true,
    syncScrolling: true,
    readOnly: false,
    tabSize: 4,
    indentUnit: 4,
    lineNumbers: true,
    lineWrapping: true,
    autoCloseBrackets: true,
    showTrailingSpace: true,
    matchBrackets: true,
    indentWithTabs: true,
    styleSelectedText: true,
    matchWordHighlight: true,
    styleActiveLine: true,
    dialogLockScreen: true,
    dialogShowMask: true,
    dialogDraggable: true,
    dialogMaskBgColor: '#fff',
    dialogMaskOpacity: 0.1,
    fontSize: '13px',
    saveHTMLToTextarea: true,
    previewCodeHighlight: true,
    disabledKeyMaps: [],
    imageUpload: false,
    imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
    imageUploadURL: '',
    crossDomainUpload: false,
    uploadCallbackURL: '',
    toc: true,
    tocm: true,
    htmlDecode: true,
    pageBreak: true,
    atLink: true,
    emailLink: true,
    taskList: false,
    emoji: false,
    tex: false,
    flowChart: false,
    sequenceDiagram: false,
    toolbar: true,
    toolbarAutoFixed: true,
    toolbarIcons: 'full',
    toolbarTitles: {}
  };
  private editorCustomConfig = {
    width: '100%',
    height: 640,
    path: environment.config.editor.path,
    fontSize: '14px',
    codeFold: true,
    syncScrolling: true,
    saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
    searchReplace: true,
    watch: true, // 实时预览
    htmlDecode: 'style,script,iframe|on*', // 开启 HTML 标签解析，为了安全性，默认不开启
    toolbar: true, // 工具栏
    toolbarIcons: function () {
      //自定义工具栏，后面有详细介绍
      // return editormd.toolbarModes["mini"]; // full, simple, mini
      return environment.config.editor.toolbar;
    },
    previewCodeHighlight: true, // 关闭预览 HTML 的代码块高亮，默认开启
    emoji: true,
    taskList: true,
    tocm: false, // Using [TOCM]
    // tex: false, // 开启科学公式TeX语言支持，默认关闭
    // flowChart: false, // 开启流程图支持，默认关闭
    // sequenceDiagram: false, // 开启时序/序列图支持，默认关闭,
    dialogLockScreen: true, // 设置弹出层对话框不锁屏，全局通用，默认为true
    dialogShowMask: true, // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
    dialogDraggable: true, // 设置弹出层对话框不可拖动，全局通用，默认为true
    dialogMaskOpacity: 0.45, // 设置透明遮罩层的透明度，全局通用，默认值为0.1
    dialogMaskBgColor: '#000', // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
    imageUpload: false,
    imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
    imageUploadURL: 'http://localhost:3000/fileOSS/singleuploader',
    crossDomainUpload: true,
  };
  private onChange = (_: any) => { };
  private onTouched = () => { };

  constructor() {
    this.editorMdId = `MD${generateId(6, 16)}`;
  }

  ngAfterViewInit() {
    this.editorStartup();
  }

  writeValue(obj: string): void {
    this.editorContent = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private editorStartup(): void {
    this.createEditor(this.editorCustomConfig);
  }

  private createEditor(editorConfig: any): void {
    const that = this;
    this.markdownEditor = editormd(this.editorMdId, {
      ...editorConfig,
      theme: this.theme,
      previewTheme: this.theme,
      editorTheme: this.theme,
      readOnly: this.disabled,
      placeholder: this.placeholder,
      onload: function () {
        that.loaded.emit(true);
        if (that.disabled) {
          this.hideToolbar();
        }
        //this.fullscreen();
        //this.unwatch();
        //this.watch().fullscreen();
        //this.width("100%");
        //this.height(480);
        //this.resize("100%", 640);
      },
      onchange: function () {
        if (that.defaulted == 'html') {
          that.onChange(this.getHTML());
          that.changed.emit(this.getHTML());
        } else {
          that.onChange(this.getMarkdown());
          that.changed.emit(this.getMarkdown());
        }
      },
    });
  }
}
