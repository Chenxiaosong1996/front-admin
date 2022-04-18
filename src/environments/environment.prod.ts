export const environment = {
  production: true,
  useHash: false,
  loginUrl: 'passport/login',
  registerUrl: 'passport/register',
  ossUrl: 'https://chenxiaosong1996.top/',
  api: {
    default: 'v1',
    v1: {
      baseUrl: 'https://chenxiaosong1996.top/api',
      refreshTokenEnabled: true,
      refreshTokenType: 'auth-refresh'
    },
    v2: {
      baseUrl: 'https://chenxiaosong1996.top/api',
      refreshTokenEnabled: true,
      refreshTokenType: 'auth-refresh'
    }
  },
  config: {
    media: {
      screen: {
        minWidth: 768
      }
    },
    obs: {
      url: 'https://chenxiaosong1996.top/cloudobs'
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
