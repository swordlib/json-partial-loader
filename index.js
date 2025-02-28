// import *as loaderUtils from 'loader-utils';
const loaderUtils = require('loader-utils');
module.exports = function (source) {
  if (this.cacheable) this.cacheable();
  const query = loaderUtils.getOptions(this) || {};
  const queryKey = query.key || [];
  var value = typeof source === "string" ? JSON.parse(source) : source;
  for (let i in value) {
    let flag = false;
    for (let j = queryKey.length; j--;) {
      if (i === queryKey[j]) flag = true;
    }
    if(!flag)delete value[i]
  }
  value = JSON.stringify(value)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  return `module.exports = ${value}`;
}
