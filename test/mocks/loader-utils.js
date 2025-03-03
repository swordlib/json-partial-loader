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
      const [key, value] = part.split('=');
      result[key] = value;
    }
    
    return result;
  }
}; 