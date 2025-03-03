// 分别导入 JSON 文件中不同的一级对象
import userInfo from './data.json?key=user';
import productInfo from './data.json?key=product';
import appSettings from './data.json?key=settings';
import metaData from './data.json?key=metadata';

// 同时导入多个对象并合并它们的属性
import userAndSettings from './data.json?key=user,settings';
import productAndMeta from './data.json?key=product,metadata';

// 导入三个对象并合并它们的属性
import allData from './data.json?key=user,product,settings';

// 打印结果
console.log('用户信息:', userInfo);
console.log('产品信息:', productInfo);
console.log('应用设置:', appSettings);
console.log('元数据:', metaData);
console.log('用户和设置 (合并后):', userAndSettings);
console.log('产品和元数据 (合并后):', productAndMeta);
console.log('全部数据 (合并后):', allData);

// 演示如何访问合并后的属性
console.log('用户名:', userAndSettings.name);  // 来自user对象
console.log('主题设置:', userAndSettings.theme);  // 来自settings对象