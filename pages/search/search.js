var app = getApp();
// pages/search/search.js
var common = require('../../utils/common.js');
Page(Object.assign({}, common, {
  data: {
    focus: true,
    hotKeyShow: true,
    historyKeyShow: true,
    searchValue: '',
    page: 2,
    productData: [],
    historyKeyList: [],
    hotKeyList: [],
    loadmore: {}, //读取更多样式
    more: 1      //是否有更多产品
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Search/index',
      method: 'post',
      data: { uid: app.d.userId },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var remen = res.data.remen;
        var history = res.data.history;
        that.setData({
          historyKeyList: history,
          hotKeyList: remen,
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
  },

  //点击加载更多
  getMore: function (e) {
    this.setData({
      loadmore: {
        loading: true
      }
    });

    var that = this;
    var page = that.data.page;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Search/searches',
      method: 'post',
      data: {
        keyword: that.data.searchValue,
        uid: app.d.userId,
        page: that.data.page,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var prolist = res.data.pro;
        if (prolist == '') {
          wx.showToast({
            title: '没有更多数据！',
            duration: 2000
          });
          that.setData({
            more: 0,
            loadmore: {
              nomore: true
            }
          });
          return false;
        }
        //that.initProductData(data);
        that.setData({
          page: page + 1,
          productData: that.data.productData.concat(prolist),
          loadmore: {}  //取消加载中的样式
        });
        //endInitData
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },

  // 显示遮罩层
  showModal: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  // 隐藏遮罩层
  hideModal: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  // onReachBottom: function () {
  //   //下拉加载更多多...
  //   this.setData({
  //     page: (this.data.page + 10)
  //   })

  //   this.searchProductData();
  // },
  doKeySearch: function (e) {
    var key = e.currentTarget.dataset.key;
    this.setData({
      searchValue: key,
      hotKeyShow: false,
      historyKeyShow: false,
    });

    this.data.productData.length = 0;
    this.searchProductData();
  },
  doSearch: function () {
    var searchKey = this.data.searchValue;
    if (!searchKey) {
      this.setData({
        focus: true,
        hotKeyShow: true,
        historyKeyShow: true,
        productData: [],
      });
      return;
    };

    this.setData({
      hotKeyShow: false,
      historyKeyShow: false,
      more: 1,
      page: 2 
    })

    this.data.productData.length = 0;
    this.searchProductData();

    this.getOrSetSearchHistory(searchKey);
  },
  getOrSetSearchHistory: function (key) {
    var that = this;
    wx.getStorage({
      key: 'historyKeyList',
      success: function (res) {
        console.log(res.data);

        //console.log(res.data.indexOf(key))
        if (res.data.indexOf(key) >= 0) {
          return;
        }

        res.data.push(key);
        wx.setStorage({
          key: "historyKeyList",
          data: res.data,
        });

        that.setData({
          historyKeyList: res.data
        });
      }
    });
  },
  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
    if (!value && this.data.productData.length == 0) {
      this.setData({
        hotKeyShow: true,
        historyKeyShow: true,
      });
    }
  },
  searchProductData: function () {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Search/searches',
      method: 'post',
      data: {
        keyword: that.data.searchValue,
        uid: app.d.userId,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var data = res.data.pro;
        that.setData({
          productData: that.data.productData.concat(data),
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    });
  },

  clearInput: function () {
    this.setData({
      searchValue: "",
      hotKeyShow: true,
      productData: [],
      more: 1,
      page:2 
    });
  },

  clearHistory:function(){
    let that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Search/delHistory',
      method: 'post',
      data: { uid: app.d.userId },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        let e = res.data;
        //console.log(res);
        if(e.code){
            wx.showModal({
              title: '清除历史出错!',
              content: e.msg,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            });
        }
        that.setData({
          historyKeyList: [],
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
  }

}));