/*
 * @Author: elick
 * @Date: 2019-02-07 23:35:49
 * @LastEditors: elick
 * @LastEditTime: 2019-02-11 22:24:42
 * @Description:  签到api请求
 */
import base from './base';

export default class signIn extends base {

  /**
   * 获取用户签到信息
   * @param {*} params 
   */
  static getUserSginInfo(params) {
    let url = `${this.baseUrl}/api/news/getSignInfo`;
    return this.get(url, params)
  }

  /**
   * 获取签到天数
   * @param {*} params 
   */
  static getSignDate(params) {
    let url = `${this.baseUrl}/api/news/getSignDateNew`;
    return this.get(url, params)
  }
  /**
   * 签到
   * @param {*} params 
   */
  static doSign(params) {
    let url = `${this.baseUrl}/api/news/doSign`;
    return this.get(url, params).then(data => {
      return data
    }).catch(error => {
      return error
    })
  }
}
