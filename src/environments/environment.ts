// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useHash: false,
  loginUrl: 'passport/login',
  registerUrl: 'passport/register',
  ossUrl: 'https://chenxiaosong1996.top/',
  api: {
    default: 'v1',
    v1: {
      baseUrl: 'http://localhost:3000',
      refreshTokenEnabled: true,
      refreshTokenType: 'auth-refresh',
    },
    v2: {
      baseUrl: 'http://localhost:3000',
      refreshTokenEnabled: true,
      refreshTokenType: 'auth-refresh',
    }
  },
  config: {
    media: {
      screen: {
        minWidth: 768
      }
    },
    obs: {
      url: 'https://chenxiaosong-1257029795.cos.ap-shanghai.myqcloud.com'
    },
    editor: {
      path: 'assets/plugins/editormd/lib/',
      toolbar: ["undo",
        "redo",
        "|",
        "bold",
        "del",
        "italic",
        "quote",
        "ucwords",
        "uppercase",
        "lowercase",
        "|",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "|",
        "list-ul",
        "list-ol",
        "hr",
        "|",
        "link",
        "reference-link",
        "image",
        "code",
        "preformatted-text",
        "code-block",
        "table",
        "datetime",
        "html-entities",
        "pagebreak",
        "|",
        "watch",
        "preview",
        "fullscreen",
        "clear",
        "search",]
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
