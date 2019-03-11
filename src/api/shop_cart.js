/*
 * @Author: elick
 * @LastEditors: elick
 * @Description: 购物车api
 * @Date: 2019-03-11 14:11:46
 * @LastEditTime: 2019-03-11 21:08:21
 */

import base from './base';
import Page from '../utils/Page';

export default class coupon extends base {

  /**
   * 会员中心领取优惠券页面 优惠券列表
   * @param {*} params 
   */
  static cartList(params) {
    let url = `${this.baseUrl}/api/news/GetShopCartList`;
    return this.get(url, params).then(data => {
      return data
    }).catch(error => {
      return error
    })
  }
  /**
   * 更新商品数量
   * @param {*} params 
   */
  static cartUpdateNum(params) {
    let url = `${this.baseUrl}/api/news/cartUpdateNum`;
    return this.get(url, params).then(data => {
      return data
    }).catch(error => {
      return error
    })
  }
  /**
   * 选择商品
   * @param {*} params 
   */
  static cartCheck(params) {
    let url = `${this.baseUrl}/api/news/goodsCartCheck`;
    return this.get(url, params).then(data => {
      return data
    }).catch(error => {
      return error
    })
  }
  /**
   * 全选商品
   * @param {*} params 
   */
  static cartCheckAll(params) {
    let url = `${this.baseUrl}/api/news/goodsCartCheckAll`;
    return this.get(url, params).then(data => {
      return data
    }).catch(error => {
      return error
    })
  }
  /**
   * 删除商品
   * @param {*} params 
   */
  static cartDel(params) {
    let url = `${this.baseUrl}/api/news/goodsCartDelete`;
    return this.get(url, params).then(data => {
      return data
    }).catch(error => {
      return error
    })
  }


}
