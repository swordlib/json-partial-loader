const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        resourceQuery: /key=.+/,  // 匹配带有 key= 参数的请求
        type: 'javascript/auto',  // 防止webpack默认的json loader处理
        use: [
          {
            loader: '@swordlib/json-partial-loader',
            // 这里不需要指定options，因为我们会从resourceQuery中获取
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  }
}; 