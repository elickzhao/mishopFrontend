/*
 * @Author: elick
 * @LastEditors: elick
 * @Date: 2019-02-28 01:44:02
 * @LastEditTime: 2019-03-08 00:02:09
 * @Description: 地址api
 */
import base from './base';
import Page from '../utils/Page';

export default class addresses extends base {
  /**
   * 获取用户地址
   * @param {*} params 
   */
  static getUserAddress(params) {
    let url = `${this.baseUrl}/api/news/getUserAddressNew`;
    return this.get(url, params).then(data => {
      return data
    }).catch(error => {
      return error
    })
  }
  /**
   *  保存地址
   * @param {*} params 
   */
  static saveAddress(params) {
    let url = `${this.baseUrl}/api/news/saveAddress`;
    return this.get(url, params).then(data => {
      return data
    }).catch(error => {
      return error
    })
  }
  /**
   * 删除地址
   * @param {*} params 
   */
  static delUserAddress(params) {
    let url = `${this.baseUrl}/api/news/delUserAddress`;
    return this.get(url, params).then(data => {
      return data
    }).catch(error => {
      return error
    })
  }
  /**
   * 用户收货地址根据id查询
   * @param {*} params 
   */
  static receiverInfoById(params) {
    let url = `${this.baseUrl}/api/news/receiverInfoByIdNew`;
    return this.get(url, params).then(data => {
      return data
    }).catch(error => {
      return error
    })
  }
}
