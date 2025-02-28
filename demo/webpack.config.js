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
        resourceQuery: /key=.+/,  // 匹配带有 key[]= 参数的请求
        use: [
          {
            loader: path.resolve(__dirname, '../index.js'),
            // 这里不需要指定options，因为我们会从resourceQuery中获取
          }
        ],
        type: 'javascript/auto'  // 防止webpack默认的json loader处理
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  }
}; 