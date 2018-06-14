import {
  wxRequest
} from '../utils/wxRequest';

let env = "-test" //-dev 或者 -test
const apiMall = 'https://sujiefs.com/'
//const apiMall = 'https://api.tangxinmao.com'
const jishi = 'https://small.huanqiujishi.com/index.php'

/**
 * 获取发现好商品接口
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
//const getDiscoverList = (params) => wxRequest(params, apiMall + '/goods/list?cateidOne=1&cateidTwo=0&price=0&sales=2');

//微信的jscode换取sessionKey
const wxJsCode2Session = (params) => wxRequest(params, jishi + "/api/news/getsessionkey");
const user2session = (params) => wxRequest(params, jishi + "/api/news/user2session");

//商品接口---begin
//首页发现商品接口
//const hostGoodsList = (params) => wxRequest(params, apiMall + '/api/home/hostGoodsList');
//const getHomeDisvocerList = (params) => wxRequest(params, apiMall + '/api/mall/discoverList');

//促销商品  热卖 特价 秒杀 ...
const discountGoodsList = (params) => wxRequest(params, jishi + '/api/news/discountGoodsList');

//查询商品列表
const getGoodsList = (params) => wxRequest(params, jishi + '/api/news/searchGoodsList');

//查询商品详情信息
////const goodsDetail = (params) => wxRequest(params, apiMall + '/api/mall/goods');
const goodsDetail = (params) => wxRequest(params, jishi + '/api/news/goods');
//获取起送费用
const getMiniNum = (params) => wxRequest(params, jishi + '/api/news/miniNum');
//商品加入购物车
const addCart = (params) => wxRequest(params, jishi + '/api/news/goodsCartAdd');
//用户的购物车商品列表
const cartList = (params) => wxRequest(params, jishi + '/api/news/goodsCartList');
//购物车的商品选中状态
const cartCheck = (params) => wxRequest(params, jishi + '/api/news/goodsCartCheck');
//购物车的商品选中状态(全选)
const cartCheckAll = (params) => wxRequest(params, jishi + '/api/news/goodsCartCheckAll');
//购物车的商品删除
const cartDel = (params) => wxRequest(params, jishi + '/api/news/goodsCartDelete');
//购物车的商品数量更新
const cartUpdateNum = (params) => wxRequest(params, jishi + '/api/news/cartUpdateNum');
//直接购买商品
const preOrder = (params) => wxRequest(params, jishi + '/api/news/buyCart');

//支付前生成订单
const saveByCart = (params) => wxRequest(params, jishi + '/api/news/payment');

//支付统一下单
const toPay = (params) => wxRequest(params, jishi + '/Api/Wxpay/wxpay');

//商品收藏
const goodsFavorite = (params) => wxRequest(params, jishi + '/api/news/goodsFavoriteAdd');

//商品收藏删除
const goodsUnFavorite = (params) => wxRequest(params, jishi + '/api/news/goodsFavoriteDelete');

//商品是否已收藏
const goodsIsFavorite = (params) => wxRequest(params, jishi + '/api/news/goodsIsFavorite');

//商品接口---end

//用户相关信息--begin
//用户的当天签到信息
const userSginInfo = (params) => wxRequest(params, jishi + '/api/news/signInfo');

const doSign = (params) => wxRequest(params, jishi + '/api/news/doSign');
//获取最近七天签到情况
const getSignDate = (params) => wxRequest(params, jishi + '/api/news/getSignDate');

//用户积分信息
//const pointInfo = (params) => wxRequest(params, apiMall + '/api/userPoint/pointInfo');

//用户足迹信息
//const browseInfo = (params) => wxRequest(params, apiMall + '/api/userBrowse/browseInfo');
//添加用户足迹
//const addBrowser = (params) => wxRequest(params, apiMall + '/api/userBrowse/add');
//添加用户足迹
//const delUserBrowser = (params) => wxRequest(params, apiMall + '/api/userBrowse/delete');

//用户收藏的商品
const favoriteInfo = (params) => wxRequest(params, jishi + '/api/news/favoriteInfo');

//用户消息
//const messageInfo = (params) => wxRequest(params, apiMall + '/api/systemMessage/messageInfo');

//用户手机绑定
//const registerUser = (params) => wxRequest(params, apiMall + '/api/userCenter/register');
//发送短信
//const sendRandCode = (params) => wxRequest(params, apiMall + '/api/sms/send');

//用户是否绑定手机号
//const getUserInfo = (params) => wxRequest(params, apiMall + '/api/userCenter/getUserInfo');

//用户收货地址
const getUserAddress = (params) => wxRequest(params, jishi + '/api/news/getUserAddress');

//保存用户收货地址
const saveAddress = (params) => wxRequest(params, jishi + '/api/news/saveAddress');

//用户收货地址根据id查询
const receiverInfoById = (params) => wxRequest(params, jishi + '/api/news/receiverInfoById');

//根据Id删除收货地址
const delUserAddress = (params) => wxRequest(params, jishi + '/api/news/delUserAddress');

//查询关键字保存
//const addSearchKeyword = (params) => wxRequest(params, apiMall + '/api/searchkeyword/add');
//查询关键字列表
const searchKeywordList = (params) => wxRequest(params, jishi + '/api/news/historyKeyList');
//查询热门关键字列表
const searchHotKeyList = (params) => wxRequest(params, jishi + '/api/news/searchHotKey');
//查询关键字清除
const clearSearchKeyword = (params) => wxRequest(params, jishi + '/api/news/delHistory');

//查询我的订单
const getMyOrderList = (params) => wxRequest(params, jishi + '/api/news/getMyOrderList');

//查询我的订单数量
//const getMyOrderSize = (params) => wxRequest(params, apiMall + '/api/mall/goodsOrder/getMyOrderSize');

//根据订单号查询详情
const getOrderInfo = (params) => wxRequest(params, jishi + '/api/news/getOrderDetail');

//根据订单号查询详情
const getPayOrderDetail = (params) => wxRequest(params, jishi + '/api/news/getPayOrderDetail');

//根据订单号编辑订单
const editOrderInfo = (params) => wxRequest(params, jishi + '/api/news/ordersEdit');

//根据订单号查询物流
//const orderExpressInfo = (params) => wxRequest(params, apiMall + '/api/orderExpress/orderExpressInfo');

//查询用户的已订购产品
//const goodsUserOrderList = (params) => wxRequest(params, apiMall + '/api/mall/goodsOrder/goodsUserOrderList');

//退货操作
//const refundApply = (params) => wxRequest(params, apiMall + '/api/mall/refund/saveRefundApply');

//用户相关信息--end

//商品分类--begin
//一级分类
////const rootCtegoryList = (params) => wxRequest(params, apiMall + '/api/mall/rootCtegoryList');
const rootCtegoryList = (params) => wxRequest(params, jishi + '/api/news/rootCtegoryList');
//二级三级分类
////const childGoodsCatetoryList = (params) => wxRequest(params, apiMall + '/api/mall/childGoodsCatetoryList');
const childGoodsCatetoryList = (params) => wxRequest(params, jishi + '/api/news/childGoodsCatetoryList');
//商品分类--end

//查询广告列表
// const getAdList = (params) => wxRequest(params, apiMall + '/api/adverts/list');
const getAdList = (params) => wxRequest(params, jishi + '/api/Index/ggtop');

module.exports = {
  getMiniNum,
  getAdList,
  childGoodsCatetoryList,
  rootCtegoryList,
  searchHotKeyList,
  getSignDate,
  doSign,
  userSginInfo,
  goodsDetail,
  getGoodsList,
  discountGoodsList,
  wxJsCode2Session,
  goodsIsFavorite,
  goodsFavorite,
  goodsUnFavorite,
  addCart,
  user2session,
  cartList,
  cartCheck,
  cartCheckAll,
  cartUpdateNum,
  cartDel,
  searchKeywordList,
  clearSearchKeyword,
  getMyOrderList,
  getOrderInfo,
  editOrderInfo,
  favoriteInfo,
  getUserAddress,
  saveAddress,
  receiverInfoById,
  delUserAddress,
  preOrder,
  saveByCart,
  toPay,
  getPayOrderDetail,
}

// module.exports = {
//   getMiniNum,
//   hostGoodsList,
//   getDiscoverList, getHomeDisvocerList,
//   getGoodsList,
//   goodsDetail,
//   wxJsCode2Session,
//   user2session,
//   userSginInfo,
//   doSign,
//   addCart, cartList, cartCheck, cartCheckAll, cartDel, cartUpdateNum,
//   preOrder,refundApply,
//   pointInfo,
//   browseInfo,addBrowser,delUserBrowser,
//   favoriteInfo,
//   messageInfo,
//   registerUser,sendRandCode,
//   getUserInfo,
//   getUserAddress,
//   saveAddress,
//   receiverInfoById,
//   getUserAddress,
//   addSearchKeyword, searchKeywordList, clearSearchKeyword,searchHotKeyList,
//   getMyOrderList, saveByCart,toPay,
//   rootCtegoryList, childGoodsCatetoryList,
//   getOrderInfo,
//   editOrderInfo, goodsUserOrderList,
//   orderExpressInfo,
//   delUserAddress,
//   goodsFavorite,
//   goodsUnFavorite,
//   goodsIsFavorite,
//   getMyOrderSize,getPayOrderDetail,
//   getAdList,
//   getSignDate,
//   discountGoodsList
// }
