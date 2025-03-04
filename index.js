const loaderUtils = require('loader-utils');
const _ = require('lodash');

module.exports = function (source) {
  if (this.cacheable) this.cacheable();
  
  // 从resourceQuery获取参数（URL查询字符串）
  let resourceQuery = {};
  let keys = [];
  let hasEmptyKey = false;
  
  if (this.resourceQuery) {
    try {
      // 检查是否是空键名列表的特殊情况
      if (this.resourceQuery.includes('key=,') || this.resourceQuery === '?key=' || this.resourceQuery.endsWith(',')) {
        hasEmptyKey = true;
      }
      
      // 解析查询参数
      resourceQuery = loaderUtils.parseQuery(this.resourceQuery);
      
      // 处理键名
      // 如果有key参数，将其作为第一个键
      if (resourceQuery.key !== undefined) {
        if (resourceQuery.key !== '') {
          keys.push(resourceQuery.key);
        }
      }
      
      // 检查是否有其他键作为独立参数（由于loader-utils将逗号分隔的值解析为单独的参数）
      // 例如 ?key=a,b,c 会被解析为 { key: 'a', b: true, c: true }
      for (const key in resourceQuery) {
        if (key !== 'key' && resourceQuery[key] === true) {
          // 处理带空格的键名，去除前后空格
          const trimmedKey = key.trim();
          if (trimmedKey) {
            keys.push(trimmedKey);
          }
        }
      }
    } catch (e) {
      // 解析查询字符串失败时不处理
    }
  }
  
  var value = typeof source === "string" ? JSON.parse(source) : source;

  let moduleValue;
  
  // 处理多个键的情况
  if (keys.length > 1) {
    // 使用lodash的深度合并功能合并所有键对应对象的属性到一个新对象中
    moduleValue = {};
    for (const key of keys) {
      if (value[key] !== undefined) {
        if (typeof value[key] === 'object' && value[key] !== null) {
          // 对于对象类型，使用lodash的merge进行深度合并
          _.merge(moduleValue, value[key]);
        } else {
          // 对于非对象类型，使用键名作为属性名
          moduleValue[key] = value[key];
        }
      }
    }
  } else if (keys.length === 1) {
    // 单个键的情况
    moduleValue = value[keys[0]];
  } else {
    // 没有键的情况
    moduleValue = undefined;
  }
  
  // 处理空键列表的特殊情况
  if (hasEmptyKey || 
      (this.resourceQuery && 
       this.resourceQuery.includes('key=') && 
       !this.resourceQuery.replace('key=', '').replace('?', '').trim())) {
    moduleValue = {};
  }

  value = JSON.stringify(moduleValue);
    // .replace(/\u2028/g, '\\u2028')
    // .replace(/\u2029/g, '\\u2029');

  return `module.exports = ${value}`;
}
