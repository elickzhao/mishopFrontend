import wepy from 'wepy'
import api from '@/api/login'
import Tips from '@/utils/Tips'
import WxUtils from '@/utils/WxUtils'

export default class AuthorizeMixin extends wepy.mixin {
  data = {
    backUrl: '/pages/home/home',
    currentPage: ''

  }
  methods = {}

  onShow() {}

  async onLoad(ops) {
    this.currentPage = WxUtils.getCurrentPagesUrl()
    // 如果其他页面 权限检查 需要跳转回原页面
    if (ops.back) {
      this.backUrl = ops.back
    }
  }

  /**
   * 登录检查 已经注册直接登录
   */
  async login() {
    console.info(`[login] login start `);
    let that = this
    let res = await wepy.login();
    if (res.code) {
      let rlt = await api.wxJsCode2Session({
        code: res.code
      });
      if (rlt.openid) {
        that.openid = rlt.openid
        that.$apply()
        // 老用户登录
        let json = await api.user2session({
          openId: rlt.openid
        });
        // 登录失败 注册新用户
        if (json.serverCode) {
          if (this.currentPage == 'pages/home/login') {
            Tips.error(json.message);
            await this.register();
          } else {
            //跳转到login用于授权
            WxUtils.backOrRedirect('login')
          }
        } else {
          // 检测登录 并跳转
          // 这里指向不了mix的onload的 所以 判断后跳转 只能写在原页面的onload里
          this.onLoad()
        }
      } else {
        await wepy.showModal({
          title: 'openid 有误',
          content: '授权失败'
        });
      }
    } else {
      await wepy.showModal({
        title: '网络错误,登录失败!',
        content: res.errMsg
      });
    }
  }
  /**
   * 注册
   */
  async register() {
    console.info(`[register] register start `);
    // 授权会关闭页面 这里重新打开
    this.isShow = true
    this.$apply()
    let that = this;
    let check = await this.checkSetting();
    // 检测权限 打开授权页面
    if (!check) {
      // 按钮获得权限
      this.isShow = false
      this.$apply()
      return;
    }
    // 注册用户
    wx.getUserInfo({
      success: function (res) {
        let userInfo = res.userInfo;
        let json = api.user2session({
          openId: that.openid,
          NickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
          gender: userInfo.gender
        });
        // 注册失败
        if (json.serverCode) {
          Tips.modal(json.message, '注册失败');
        }
      }
    });
    console.info(`[register] register end `)
    // 注册完成后跳转
    this.jump()
  }
  /**
   * 检查设置权限
   */
  async checkSetting() {
    let scope = await wepy.getSetting();
    if (scope.authSetting['scope.userInfo']) {
      console.info(`[scope.userInfo] check userInfo true`);
      return true;
    } else {
      console.info(`[scope.userInfo] check userInfo false`);
      return false;
    }
  }
  /**
   * 授权按钮响应
   */
  async onGotUserInfo(e) {
    if (e.detail.errMsg === 'getUserInfo:ok') {
      // 这样授权会造成 有权限 却无会员信息内容 无法注册 虽然概率很小 但还是用getuserinfo来获取信息吧
      // 这个先保留 看看 getuserinfo 速度如何 不行再替换
      // this.userInfo == e.detail.userInfo
      // this.$apply()
      console.info(`[register] get userInfo true `);
      this.register()
    } else {
      console.info(`[register] get userInfo false `);
      await wepy.showModal({
        title: '授权失败!',
        content: '拒绝授权,将无法使用小程序!'
      });
      console.log(e.detail.errMsg);
    }
  }
  /**
   * 跳转页面
   */
  jump() {
    console.info(`[login] login end `);
    // 跳转
    WxUtils.backOrRedirect(this.backUrl)
    // wepy.redirectTo({
    //   url: this.backUrl
    // });
    // if (this.backUrl) {
    //   wepy.redirectTo({
    //     url: '/pages/' + this.backUrl
    //   });
    // } else {
    //   wepy.redirectTo({
    //     url: '/pages/home/home'
    //   });
    // }
    // 这是后期要用到的 因为有跳转 URL
    // if (that.backUrl) {
    //   //console.log(that.backUrl);
    //   let url = ""
    //   if (that.backId) {
    //     url = '/pages/' + that.backUrl + '?id=' + that.backId
    //   } else {
    //     url = '/pages/' + that.backUrl
    //   }
    //   //console.log(url)
    //   wepy.redirectTo({
    //     url: url
    //   });
    // } else {
    //   wepy.switchTab({
    //     url: "/pages/home"
    //   });
    // }
  }

  /**
   *  跳转等待 展示欢迎页
   */
  showLoading() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: 'loading ok'
        });
      }, 1000);
    });
  }
}
