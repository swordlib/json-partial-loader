// 分别导入 JSON 文件中不同的一级对象
import userInfo from './data.json?key=user';
import productInfo from './data.json?key=product';
import appSettings from './data.json?key=settings';
import metaData from './data.json?key=metadata';

// 打印结果
console.log('用户信息:', userInfo);
console.log('产品信息:', productInfo);
console.log('应用设置:', appSettings);
console.log('元数据:', metaData);