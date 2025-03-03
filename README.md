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

### 多键导入

你也可以通过逗号分隔的方式一次性导入多个键对应的值。当使用多键导入时，所有指定键对应对象的属性会被合并到一个对象中：

```javascript
// 同时导入用户信息和应用设置，合并它们的属性
import userAndSettings from './data.json?key=user,settings';

// 打印结果
console.log('用户和设置:', userAndSettings);
// 输出: {
//   name: "张三", 
//   age: 30,
//   theme: "dark", 
//   notifications: true
// }

// 可以直接访问合并后的属性
console.log('用户名:', userAndSettings.name);  // 来自user对象
console.log('主题设置:', userAndSettings.theme);  // 来自settings对象
```

你还可以导入三个或更多的键：

```javascript
// 导入三个对象并合并它们的属性
import allData from './data.json?key=user,product,settings';

// 输出: {
//   name: "张三", 
//   age: 30,
//   id: "p001", 
//   theme: "dark", 
//   notifications: true
// }
```

## 工作原理

1. 当导入 JSON 文件时，loader 会解析文件内容
2. 解析导入语句中的查询参数 `?key=xxx` 或 `?key=xxx,yyy,zzz`
3. 从 JSON 对象中提取对应键名的值
4. 只导出该键对应的值，而不是整个 JSON 对象
5. 当指定多个键时，会将所有键对应对象的属性合并到一个新对象中

## 优势

- **性能优化**：在大型 JSON 文件中，只导入需要的部分可以减少内存使用
- **代码清晰**：代码中明确表明只使用 JSON 的特定部分
- **按需加载**：在不同组件中可以只导入各自需要的数据
- **灵活组合**：可以通过多键导入组合需要的数据

## 注意事项

- 确保查询参数中的键名存在于 JSON 文件中，否则将得到 `undefined`
- 当使用多键导入时，如果某个键不存在，该键将被忽略
- 当使用多键导入时，如果不同对象有同名属性，后面的键对应的属性值会覆盖前面的
- 此 loader 适用于一级键的提取，不支持深层嵌套路径（如 `user.profile.name`）

## 测试

本项目使用 Vitest 进行单元测试。测试覆盖了多种场景：

- 处理没有查询参数的情况
- 根据查询参数提取特定字段
- 处理嵌套的 JSON 对象
- 处理非字符串的输入（已经是对象的情况）
- 处理不存在的键名
- 处理数组类型的 JSON
- 处理包含特殊字符的 JSON
- 通过逗号分隔处理多个键
- 在多键处理中忽略不存在的键
- 处理复杂对象的多键提取
- 处理有空格的多键情况
- 处理空键名列表

运行测试：

```bash
# 安装依赖
npm install

# 运行测试
npm test
```

你也可以通过以下命令运行测试监视模式：

```bash
npm run test:watch
```
