module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  // 修改主题变量
                  'primary-color': '#7546c9',
                  'link-color': '#7546c9'
                },
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  }
};
