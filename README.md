
一个 Webpack loader，用于从 JSON 文件中按键名选择性地导入部分内容。

## 功能介绍

JSON Key Loader 允许你只导入 JSON 文件中的特定部分，而不是整个 JSON 对象。通过在导入语句中使用查询参数 `?key=xxx`，你可以只提取 JSON 中对应键名的值。

## 安装

```bash
npm install --save-dev json-partial-loader

## Webpack 配置

webpack 配置:

```javascript
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
            loader: require('json-partial-loader'),
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
```

## 使用方法

假设你有一个 JSON 文件 `data.json` 包含以下内容：

```json
{
  "user": {
    "name": "张三",
    "age": 30
  },
  "product": {
    "id": "p001",
    "name": "示例产品"
  },
  "settings": {
    "theme": "dark",
    "notifications": true
  },
  "metadata": {
    "version": "1.0.0",
    "lastUpdated": "2023-01-01"
  }
}
```

你可以这样选择性地导入特定部分：

```javascript
// 分别导入 JSON 文件中不同的一级对象
import userInfo from './data.json?key=user';
import productInfo from './data.json?key=product';
import appSettings from './data.json?key=settings';
import metaData from './data.json?key=metadata';

// 打印结果
console.log('用户信息:', userInfo); // {name: "张三", age: 30}
console.log('产品信息:', productInfo); // {id: "p001", name: "示例产品"}
console.log('应用设置:', appSettings); // {theme: "dark", notifications: true}
console.log('元数据:', metaData); // {version: "1.0.0", lastUpdated: "2023-01-01"}
```

## 工作原理

1. 当导入 JSON 文件时，loader 会解析文件内容
2. 解析导入语句中的查询参数 `?key=xxx`
3. 从 JSON 对象中提取对应键名的值
4. 只导出该键对应的值，而不是整个 JSON 对象

## 优势

- **性能优化**：在大型 JSON 文件中，只导入需要的部分可以减少内存使用
- **代码清晰**：代码中明确表明只使用 JSON 的特定部分
- **按需加载**：在不同组件中可以只导入各自需要的数据

## 注意事项

- 确保查询参数中的键名存在于 JSON 文件中，否则将得到 `undefined`
- 此 loader 适用于一级键的提取，不支持深层嵌套路径（如 `user.profile.name`）
