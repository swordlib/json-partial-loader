// 分别导入 JSON 文件中不同的一级对象
import userInfo from '../shared/data.json?key=user';
import productInfo from '../shared/data.json?key=product';
import appSettings from '../shared/data.json?key=settings';
import metaData from '../shared/data.json?key=metadata';

// 同时导入多个对象并合并它们的属性
import userAndSettings from '../shared/data.json?key=user,settings';
import productAndMeta from '../shared/data.json?key=product,metadata';

// 导入三个对象并合并它们的属性
import allData from '../shared/data.json?key=user,product,settings';

// 展示深度合并功能
import userAndAdditionalUser from '../shared/data.json?key=user,additionalUser';

console.log('==== Webpack 4 Demo ====');
// 打印结果
console.log('用户信息:', userInfo);
console.log('产品信息:', productInfo);
console.log('应用设置:', appSettings);
console.log('元数据:', metaData);
console.log('用户和设置 (合并后):', userAndSettings);
console.log('产品和元数据 (合并后):', productAndMeta);
console.log('全部数据 (合并后):', allData);

// 演示如何访问合并后的属性
console.log('\n==== 基本属性访问 ====');
console.log('用户名:', userAndSettings.name);  // 来自user对象
console.log('主题设置:', userAndSettings.theme);  // 来自settings对象

// 演示深度合并功能
console.log('\n==== 深度合并示例 ====');
console.log('用户和额外用户合并后:', userAndAdditionalUser);
console.log('合并后的通知偏好:');
console.log('- Email通知:', userAndAdditionalUser.preferences.notifications.email);
console.log('- 短信通知:', userAndAdditionalUser.preferences.notifications.sms);
console.log('- 应用通知:', userAndAdditionalUser.preferences.notifications.app);
console.log('合并后的地址信息:');
console.log('- 城市:', userAndAdditionalUser.address.city);
console.log('- 区域:', userAndAdditionalUser.address.district);
console.log('- 街道:', userAndAdditionalUser.address.street);
console.log('- 邮编:', userAndAdditionalUser.address.zipcode);