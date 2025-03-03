import { describe, it, expect, vi, beforeEach } from 'vitest';
// 使用require导入CommonJS模块
const loader = require('../index.js');

// 模拟loader-utils
vi.mock('loader-utils', () => require('./mocks/loader-utils.js'));

// 模拟loader上下文
const createLoaderContext = (resourceQuery = '') => ({
  resourceQuery,
  cacheable: vi.fn()
});

describe('json-partial-loader', () => {
  let loaderContext;

  beforeEach(() => {
    loaderContext = createLoaderContext();
  });

  it('应该能在没有查询参数时返回undefined', () => {
    // 模拟JSON输入
    const source = JSON.stringify({ a: 1, b: 2, c: 3 });
    
    // 绑定上下文并调用loader
    const result = loader.call(loaderContext, source);
    
    // 断言loader调用了cacheable
    expect(loaderContext.cacheable).toHaveBeenCalled();
    
    // 当没有查询参数时，应该返回undefined
    expect(result).toBe(`module.exports = undefined`);
  });

  it('应该能根据查询参数提取特定字段', () => {
    // 设置查询参数
    loaderContext = createLoaderContext('?key=b');
    
    // 模拟JSON输入
    const source = JSON.stringify({ a: 1, b: 2, c: 3 });
    
    // 绑定上下文并调用loader
    const result = loader.call(loaderContext, source);
    
    // 断言loader调用了cacheable
    expect(loaderContext.cacheable).toHaveBeenCalled();
    
    // 验证返回的内容是否为指定的字段
    expect(result).toBe(`module.exports = 2`);
  });

  it('应该处理嵌套的JSON对象', () => {
    // 设置查询参数
    loaderContext = createLoaderContext('?key=nested');
    
    // 模拟JSON输入
    const source = JSON.stringify({ 
      simple: 1, 
      nested: { 
        a: 'test', 
        b: [1, 2, 3] 
      }
    });
    
    // 绑定上下文并调用loader
    const result = loader.call(loaderContext, source);
    
    // 验证返回的内容是否为指定的嵌套对象
    expect(result).toBe(`module.exports = {"a":"test","b":[1,2,3]}`);
  });

  it('应该处理非字符串的输入(已经是对象的情况)', () => {
    // 设置查询参数
    loaderContext = createLoaderContext('?key=a');
    
    // 模拟非字符串输入（直接作为对象）
    const source = { a: 1, b: 2 };
    
    // 绑定上下文并调用loader
    const result = loader.call(loaderContext, source);
    
    // 验证返回的内容是否为指定字段
    expect(result).toBe(`module.exports = 1`);
  });

  it('应该在不存在查询键时返回undefined', () => {
    // 设置查询参数
    loaderContext = createLoaderContext('?key=nonexistent');
    
    // 模拟JSON输入
    const source = JSON.stringify({ a: 1, b: 2 });
    
    // 绑定上下文并调用loader
    const result = loader.call(loaderContext, source);
    
    // 验证返回undefined
    expect(result).toBe(`module.exports = undefined`);
  });

  it('应该能处理数组类型的JSON', () => {
    // 设置查询参数获取第二个元素
    loaderContext = createLoaderContext('?key=1');
    
    // 模拟数组JSON输入
    const source = JSON.stringify([
      { id: 1, name: 'item1' },
      { id: 2, name: 'item2' },
      { id: 3, name: 'item3' }
    ]);
    
    // 绑定上下文并调用loader
    const result = loader.call(loaderContext, source);
    
    // 验证返回的内容是否为数组中的第二个元素
    expect(result).toBe(`module.exports = {"id":2,"name":"item2"}`);
  });

  it('应该能处理带有特殊字符的JSON', () => {
    // 设置查询参数
    loaderContext = createLoaderContext('?key=special');
    
    // 模拟带有特殊字符的JSON输入
    const source = JSON.stringify({ 
      normal: "text",
      special: "包含中文和特殊符号!@#$%^&*()"
    });
    
    // 绑定上下文并调用loader
    const result = loader.call(loaderContext, source);
    
    // 验证返回的内容是否为指定字段并保留特殊字符
    expect(result).toBe(`module.exports = "包含中文和特殊符号!@#$%^&*()"`);
  });
}); 