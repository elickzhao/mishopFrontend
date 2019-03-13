/*
 * @Author: elick
 * @LastEditors: elick
 * @Date: 2019-02-28 01:44:02
 * @LastEditTime: 2019-03-12 23:48:42
 * @Description: 订单api
 */
import base from './base';
import Page from '../utils/Page';

export default class order extends base {
  /**
   * 获取各个类型订单数量
   * @param {*} params 
   */
  static getOrderInfo(params) {
    let url = `${this.baseUrl}/api/news/getOrderCountNew`;
    return this.get(url, params)
  }

  /**
   * 获取订单列表
   * @param {*} params 
   */
  static getMyOrderListNew() {
    let url = `${this.baseUrl}/api/news/getMyOrderListNew`;
    return new Page(url)
  }
  /**
   * 获取订单详情
   * @param {*} params 
   */
  static getOrderDetail(params) {
    let url = `${this.baseUrl}/api/news/getOrderDetailNew`;
    return this.get(url, params)
  }
  /**
   * 获取订单快递信息
   * @param {*} params 
   */
  static getOrderExpressInfo(params) {
    let url = `${this.baseUrl}/api/news/getOrderExpressInfo`;
    return this.get(url, params)
  }
  /**
   * 操作订单状态
   * @param {*} params 
   */
  static editOrderInfo(params) {
    let url = `${this.baseUrl}/api/news/ordersEdit`;
    return this.get(url, params).then(data => {
      return data
    }).catch(error => {
      return error
    })
  }
  /**
   * 订单支付请求
   * @param {*} params 
   */
  static toPay(params) {
    let url = `${this.baseUrl}/Api/Wxpay/wxpay`;
    return this.get(url, params)
  }
  /**
   * 获取支付订单详情
   * @param {*} params 
   */
  static getPayOrderDetail(params) {
    let url = `${this.baseUrl}/api/news/getPayOrderDetailNew`;
    return this.get(url, params)
  }
  /**
   * 购物车提交订单
   * @param {*} params 
   */
  static preOrder(params) {
    let url = `${this.baseUrl}/api/news/placeOrder`;
    return this.get(url, params)
  }
  /**
   * 购物车提交订单
   * @param {*} params 
   */
  static getShop(params) {
    let url = `${this.baseUrl}/api/Address/getShops`;
    return this.get(url)
  }
  /**
   * 购物车提交订单
   * @param {*} params 
   */
  static messageInfo(params) {
    let url = `${this.baseUrl}/api/news/messageInfo`;
    return this.get(url,params)
  }
  /**
   * 保存订单
   * @param {*} params 
   */
  static saveBuyCart(params) {
    let url = `${this.baseUrl}/api/Payment/saveBuyCart`;
    return this.get(url, params).then(data => {
      return data
    }).catch(error => {
      return error
    })
  }
  /**
   * 保存订单
   * @param {*} params 
   */
  static toPay(params) {
    let url = `${this.baseUrl}/api/Wxpay/wxpayNew`;
    return this.get(url, params).then(data => {
      return data
    }).catch(error => {
      return error
    })
  }


}
