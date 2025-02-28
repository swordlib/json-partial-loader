<div align="center">
  <h1>JSON partial Loader</h1>
</div>

<h2 align="center">Install</h2>

```bash
npm install --save-dev json-partial-loader
```


<h2 align="center">Usage</h2>



**webpack.config.js**
```js
module.exports = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-partial-loader',
        options:{
          keys: ['key']
        }
      }
    ]
  }
}
```