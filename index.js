const loaderUtils = require('loader-utils');

module.exports = function (source) {
  if (this.cacheable) this.cacheable();
  
  // 从resourceQuery获取参数（URL查询字符串）
  let resourceQuery = {};
  if (this.resourceQuery) {
    try {
      resourceQuery = loaderUtils.parseQuery(this.resourceQuery);
    } catch (e) {
      // 解析查询字符串失败时不处理
    }
  }
  
  // 合并参数，优先使用resourceQuery
  const queryKey = resourceQuery.key || [];
  
  var value = typeof source === "string" ? JSON.parse(source) : source;

  const moduleValue = value[queryKey];

  value = JSON.stringify(moduleValue);
    // .replace(/\u2028/g, '\\u2028')
    // .replace(/\u2029/g, '\\u2029');

  return `module.exports = ${value}`;
}
