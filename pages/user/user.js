// pages/user/user.js
var app = getApp()
Page({
  data: {
    dialogvisible: false,
    options: {
      showclose: false,
      showfooter: true,
      closeonclickmodal: true,
      fullscreen: false
    },
    title: '温馨提示',
    confirmText: '去设置',
    opacity: '0.4',
    width: '85',
    position: 'center',
    userInfo: {},
    orderInfo: {},
    userListInfo: [{
      icon: '../../images/iconfont-dingdan.png',
      text: '我的订单',
      isunread: true,
      unreadNum: 2
    }, {
      icon: '../../images/iconfont-card.png',
      text: '我的代金券',
      isunread: false,
      unreadNum: 2
    }, {
      icon: '../../images/iconfont-icontuan.png',
      text: '我的拼团',
      isunread: true,
      unreadNum: 1
    }, {
      icon: '../../images/iconfont-shouhuodizhi.png',
      text: '收货地址管理'
    }, {
      icon: '../../images/iconfont-kefu.png',
      text: '联系客服'
    }, {
      icon: '../../images/iconfont-help.png',
      text: '常见问题'
    }],
    loadingText: '加载中...',
    loadingHidden: false,
  },
  onLoad: function () {
    var that = this

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        loadingHidden: true
      })
    });

    this.loadOrderStatus();
  },
  onShow: function () {
    let that = this;
    this.loadOrderStatus();
    this.checkUserInfo();
  },
  //检查是否有用户昵称权限
  checkUserInfo: function () {
    let that = this;
    wx.getSetting({
      success(res) {
        //console.log(res);
        if (!res.authSetting['scope.userInfo']) {
          that.showDialog();
        }
      }
    })
  },
  // 弹出对话框
  showDialog: function () {
    this.setData({
      dialogvisible: true
    })
  },
  //点击取消
  handleClose: function () {
    this.checkUserInfo();
  },
  //点击确定
  handleConfirm: function () {
    let that = this;
    wx.openSetting({
      success: (res) => {
        /*
         * res.authSetting = {
         *   "scope.userInfo": true,
         *   "scope.userLocation": true
         * }
         */
        // app.getUserInfo();
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
          //更新数据
          that.setData({
            userInfo: userInfo,
            loadingHidden: true
          })
        });
      }
    })
  },
  loadOrderStatus: function () {
    //获取用户订单数据
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/User/getorder',
      method: 'post',
      data: {
        userId: app.d.userId,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var status = res.data.status;
        if (status == 1) {
          var orderInfo = res.data.orderInfo;
          that.setData({
            orderInfo: orderInfo
          });
        } else {
          console.log(res);
          // wx.showToast({
          //   title: '非法操作.',
          //   duration: 2000
          // });
        }
      },
      error: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
  },
  onShareAppMessage: function () {
    return {
      title: '环球集市',
      path: '/pages/index/index',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  }
})