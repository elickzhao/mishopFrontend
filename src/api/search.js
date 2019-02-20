/*
 * @Author: elick
 * @Date: 2019-02-15 22:24:24
 * @LastEditors: elick
 * @LastEditTime: 2019-02-17 01:31:17
 * @Description:  搜索api
 */

import base from './base';

export default class search extends base {
  /**
   * 获取热门搜索词
   * @param {*} params 
   */
  static searchHotKeyList(params) {
    let url = `${this.baseUrl}/api/news/getSearchHotKey`;
    return this.get(url, params)
  }

  /**
   * 获取历史搜索
   * @param {*} params 
   */
  static searchKeywordList(params) {
    let url = `${this.baseUrl}/api/news/getHistoryKeyList`;
    return this.get(url, params)
  }
  /**
   * 删除历史搜索
   * @param {*} params 
   */
  static clearSearchKeyword(params) {
    let url = `${this.baseUrl}/api/news/delHistory`;
    return this.get(url, params)
  }
}
