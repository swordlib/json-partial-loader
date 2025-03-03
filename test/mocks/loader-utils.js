// 模拟loader-utils库
module.exports = {
  parseQuery: (query) => {
    // 简单模拟parseQuery函数
    // 移除开头的?
    const queryString = query.charAt(0) === '?' ? query.substr(1) : query;
    const parts = queryString.split('&');
    const result = {};
    
    for (const part of parts) {
      if (!part) continue;
      
      // 分割键值对
      const [key, value] = part.split('=');
      
      // 存储键值对，保持value原样，不对逗号做特殊处理
      // loader会自己处理逗号分隔的情况
      result[key] = value || '';
    }
    
    return result;
  }
}; 