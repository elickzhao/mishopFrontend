import wepy from 'wepy';
import base from './base';

/**
 * 登录
 */

export default class login extends base {
  // 获取code
  static wxJsCode2Session(params) {
    let url = `${this.baseUrl}/api/news/getsessionkey2`;
    return this.get(url, params).then(data => {
      return JSON.parse(data)
    })
  }

  // 检查是否为注册用户
  static user2session(params) {
    let url = `${this.baseUrl}/api/news/user2session2`;
    return this.get(url, params).then(data => {
      wepy.setStorageSync('userInfo', data)
      wepy.$instance.globalData.userInfo = data
      return data
    }).catch(data => {
      // this.register()
      // console.log(data)
      return data
    })
  }
}
