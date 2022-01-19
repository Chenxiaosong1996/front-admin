import { environment } from '@env/environment';
import { AfterViewInit, Component, OnInit } from '@angular/core';
declare const editormd: any;

@Component({
  selector: 'app-editor-md',
  template: `<div [id]="editorMdId"></div>`
})
export class EditorMdComponent implements OnInit, AfterViewInit {
  editor: any;
  editorMdId: string = '';

  ngOnInit() {
    this.editorMdId = this.uuid(8, 16);
  }

  ngAfterViewInit() {
    this.editor = editormd(this.editorMdId, {
      width: '100%',
      height: 740,
      path: environment.config.obs.url + environment.config.editor.path,
      theme: 'dark',
      previewTheme: 'dark',
      editorTheme: 'pastel-on-dark',
      markdown: '',
      codeFold: true,
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

  uuid(len: number, radix: number) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
      i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16);
          uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  }
}
