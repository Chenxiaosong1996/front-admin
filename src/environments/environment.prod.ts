export const environment = {
  production: true,
  useHash: false,
  loginUrl: 'passport/login',
  registerUrl: 'passport/register',
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
    obs: {
      url: 'https://chenxiaosong-1257029795.cos.ap-shanghai.myqcloud.com'
    },
    editor: {
      path: '/scripts/editor.md/core/lib/',
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
        "emoji",
        "html-entities",
        "pagebreak",
        "|",
        "goto-line",
        "watch",
        "preview",
        "fullscreen",
        "clear",
        "search",]
    }
  }
};
