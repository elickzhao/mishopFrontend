import {
  getStore
} from 'wepy-redux';
import {
  SAVE
} from './types';
import config from '../api/config';
// import shop from '../api/shop';
// import goods from '../api/goods';
// import coupon from '../api/coupon';
// import member from '../api/member';

const store = getStore();
// 元数据
const meta = {};
// 是否调试
const IS_DEBUG = false;
// 超时时间
const CACHE_TIMEOUT = 5 * 60 * 1000;
// 嵌套字段，需要拆解缓存
const NESTED_KEY = ['config', 'cart', 'setting', 'member', 'coupon'];
// 初始化需要加载的字段
// const INIT_KEY = ['config', 'coupon'];
const INIT_KEY = ['config', 'cart', 'setting'];
// 加载状态
// let isLoading = false;
// 等待队列
let loadingQueue = [];

/**
 * 构造取值器
 */
const get = key => {
  return (state) => {
    return state.cache[key]
  }
};

/**
 * 保存数据
 */
const save = (key, data) => {
  if (IS_DEBUG) {
    console.info(`[store] save key=${key}, data=`, data);
  }
  store.dispatch({
    type: SAVE,
    payload: {
      key: key,
      value: data
    }
  });
};

const saveMeta = key => {
  updateMeta(key)
  // 保存元数据
  save('meta', meta);
}

/**
 * 初始化
 * 会把需要提前加载的数据 在首页显示前加载完成
 * 并且会保存到reduce里 并且会有一定的缓存时间
 */
const init = async () => {
  // 上面是原本写法 不过好像同步请求不需要那样写了 只要await就可以了
  // 开始初始化
  console.info('[store] start init store');
  // isLoading = true;
  await use(...INIT_KEY);

  // XXX 这里也许会加把本地storage里保存的数据读出来 哦 有个问题 这个是每个页面都会 init一下 用于缓存过期的问题 这样就适合了
  // XXX 可能需要再单独写一个方法 好像也不对 因为入口不一定只是 login 嗯.... 还得放这里
  // XXX  现在的状况是 写在了 Cart.js 因为小程序的机制 会提前加载所有文件 而那个文件写了构造函数 所以会提前把storage的cart保存在store里 而且保存购物车时也写入storage

  // 清空等待队列
  console.info('[store] store init completed');
  // isLoading = false;
  loadingQueue.forEach(callback => callback());
  loadingQueue = [];
};

/**
 * 加载指定字段的数据，并发加载，一次性返回，已经加载的数据不会再次加载
 */
const use = async (...fields) => {
  // 过滤已加载完毕的字段
  const fetchFileds = fields.filter(field => !exists(field));
  if (fetchFileds.length > 0) {
    console.info(`[store] use store: fields=${fetchFileds}`);
    // 加载未加载的数据
    await load(fetchFileds);
  } else {
    console.info(`[store] use store: all fields cached`);
  }
};

/**
 * 加载指定字段的数据
 */
const load = async (fields) => {
  // 将字段构造Promise
  // map产生一个新数组 在原数组基础上
  const fetchPromises = fields.map(field => fetch(field));
  // 获取所有数据，等待最后一个返回
  const data = await Promise.all(fetchPromises);
  // console.log(data);
  // 保存结果
  // forEach在原数组上进行修改  所以和map生成的新数组 在结构上是一致的
  fields.forEach((field, index) => {
    const filedData = data[index];
    // console.log('field---->',field)
    // 判断是否嵌套
    if (isNested(field)) {
      const keys = Object.keys(filedData); // 返回对象的可枚举属性和方法的名称。
      // console.log(keys);
      console.info(`[store] load [${field}] nest fields = ${keys}`);
      keys.forEach(key => save(key, filedData[key]));
    } else {
      save(field, filedData);
    }
  });
  // 保存元数据
  save('meta', meta);
};

/**
 * 刷新数据
 */
const reflesh = async (...fields) => {
  console.info(`[store] reflesh store: fields=${fields}`);
  await load(fields);
};

/**
 * 加载数据， 返回Promise
 */
const fetch = (field) => {
  // 先更新元数据
  updateMeta(field);
  // 再获取Promise对象
  switch (field) {
    case 'config':
      return config.init();
    case 'cart':
      return config.cart();
    case 'setting':
      return config.setting();
      // case 'member' :
      //   return member.info();
      // case 'notices':
      //   return shop.notices();
      // case 'status' :
      //   return shop.getStatus();
      // case 'categories' :
      //   return goods.categories();
      // case 'coupon' :
      //   return coupon.all();
      // case 'reduce' :
      //   return shop.reduces();
      // case 'recommend' :
      //   return goods.recommend().next();
      // case 'version' :
      //   return shop.chargeLimit();
  }
};

/**
 * 更新元数据
 */
const updateMeta = (field) => {
  if (meta[field] == null) {
    meta[field] = {};
    meta[field].init = true;
  }
  meta[field].updateTime = new Date().getTime();
};

/**
 * 判断是否为嵌套字段
 */
const isNested = field => {
  return NESTED_KEY.some(key => key === field);
};

/**
 * 判断是否存在
 */
const exists = key => {
  // 判断是否初始化过
  if (meta[key] == null || meta[key].init !== true) {
    return false;
  }
  // 判断是否过期
  const updateTime = meta[key].updateTime;
  const interval = new Date().getTime() - updateTime;
  return interval < CACHE_TIMEOUT;
};

/**
 * 设置回调函数
 * @param {*} 'callback'
 */
const setLoadingQueue = callback => {
  // console.log(typeof callback)
  // typeof callback 检查数组和对象 都返回 object 而且用isArray来检查返回空 可能参数传过来变对象了
  loadingQueue = (typeof callback === 'object') ? [...loadingQueue, ...callback] : [...loadingQueue, callback]
  // console.log('loadingQueue is ->',loadingQueue)
}

export default {
  get,
  save,
  use,
  saveMeta,
  exists,
  refresh: reflesh,
  init,
  setLoadingQueue
}
