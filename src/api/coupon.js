/*
 * @Author: elick
 * @LastEditors: elick
 * @Date: 2019-02-28 01:44:02
 * @LastEditTime: 2019-03-11 01:16:07
 * @Description: 优惠券api
 */
import base from './base';
import Page from '../utils/Page';

export default class coupon extends base {
  /**
   * 获取各个类型订单数量
   * @param {*} params 
   */
  static getOrderInfo(params) {
    let url = `${this.baseUrl}/api/news/getOrderCountNew`;
    return this.get(url, params)
  }


  /**
   * 会员中心领取优惠券页面 优惠券列表
   * @param {*} params 
   */
  static getCouponList(params) {
    let url = `${this.baseUrl}/api/news/getCouponListNew`;
    return this.get(url, params).then(data => {
      return data
    }).catch(error => {
      return error
    })
  }

  /**
   * 操作订单状态
   * @param {*} params 
   */
  static getCustCouponList(params) {
    let url = `${this.baseUrl}/api/news/getCustCouponListNew`;
    return this.get(url, params).then(data => {
      return data
    }).catch(error => {
      return error
    })
  }

  /**
   * 获取优惠券
   * @param {*} params 
   */
  static addVoucher(params) {
    let url = `${this.baseUrl}/api/news/addVoucherNew`;
    return this.get(url, params).then(data => {
      return data
    }).catch(error => {
      return error
    })
  }

  


}
