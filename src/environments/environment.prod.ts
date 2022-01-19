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
  }
};
