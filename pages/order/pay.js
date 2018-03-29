var app = getApp();
// pages/order/downline.js
Page({
  data: {
    itemData: {},
    userId: 0,
    paytype: 'weixin',//0线下1微信
    remark: '',
    cartId: 0,
    addrId: 0,//收货地址//测试--
    btnDisabled: false,
    productData: [],
    address: {},
    total: 0,
    vprice: 0,
    vid: 0,
    addemt: 1,
    vou: [],
    shops: [],

  },
  onLoad: function (options) {
    var uid = app.d.userId;
    this.setData({
      cartId: options.cartId,
      userId: uid
    });
    this.loadProductDetail();
    this.getShop();//取得门店
  },
  getShop: function () {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/getShop',
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res.data);
        that.setData({
          'shops': res.data.data,
        });

      },
    });
  },
  loadProductDetail: function () {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Payment/buy_cart',
      method: 'post',
      data: {
        cart_id: that.data.cartId,
        uid: that.data.userId,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //that.initProductData(res.data);
        var adds = res.data.adds;
        if (adds) {
          var addrId = adds.id;
          that.setData({
            address: adds,
            addrId: addrId
          });
        }
        that.setData({
          addemt: res.data.addemt,
          productData: res.data.pro,
          total: (res.data.price).toFixed(2),
          vprice: res.data.price,
          vou: res.data.vou,
        });
        //endInitData
      },
    });
  },

  remarkInput: function (e) {
    this.setData({
      remark: e.detail.value,
    })
  },

  //选择优惠券
  getvou: function (e) {
    var vid = e.currentTarget.dataset.id;
    var price = e.currentTarget.dataset.price;
    var zprice = this.data.vprice;
    var cprice = parseFloat(zprice) - parseFloat(price);
    this.setData({
      total: cprice,
      vid: vid
    })
  },

  //微信支付
  createProductOrderByWX: function (e) {
    this.setData({
      paytype: 'weixin',
    });

    this.createProductOrder();
  },

  //线下支付
  createProductOrderByXX: function (e) {
    this.setData({
      paytype: 'cash',
    });
    //没有门店就提示
    if (this.data.shops == null) {
      wx.showToast({
        title: "线下支付开通中，敬请期待!",
        duration: 3000
      });
      return false;
    }

    //判断联系方式
    if (this.data.addrId == 0) {
      this.hasAdress();
      return false;
    }

    //console.log('picker发送选择改变，携带值为', this.data.shops[e.detail.value])
    let shopAdd = this.data.address
    shopAdd['address_xq'] = this.data.shops[e.detail.value];
    this.setData({
      'address': shopAdd
    })
    //其他手机号什么都不用改
    //console.log('执行完毕了');
    this.createProductOrder();
  },

  //确认订单
  createProductOrder: function () {
    this.setData({
      btnDisabled: false,
    })

    //判断是否有地址
    if (this.data.addrId == 0) {
      this.hasAdress();
      return false;
    }
    // return false;
    //创建订单
    var that = this;
    //console.log(that.data.address);
    wx.request({
      url: app.d.ceshiUrl + '/Api/Payment/payment',
      method: 'post',
      data: {
        uid: that.data.userId,
        cart_id: that.data.cartId,
        type: that.data.paytype,
        aid: that.data.addrId,//地址的id
        remark: that.data.remark,//用户备注
        price: that.data.total,//总价
        vid: that.data.vid,//优惠券ID
        address: JSON.stringify(that.data.address)
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var data = res.data;
        if (data.status == 1) {
          //创建订单成功
          if (data.arr.pay_type == 'cash') {
            wx.showToast({
              title: "请自行联系商家进行发货!",
              duration: 3000
            });
            setTimeout(function () {
              wx.redirectTo({
                url: '../user/dingdan?currentTab=0&otype=pay',
              });
            }, 2500);
            return false;
          }
          if (data.arr.pay_type == 'weixin') {
            //微信支付
            that.wxpay(data.arr);
          }
        } else if (data.status == 3) {
          //console.log(data.data);
          wx.showModal({
            title: '库存不足!',
            content: '订单内有商品已被抢光,请去除后重新下单!',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../cart/cart'
                })
                console.log('用户点击确定')
              }
            }
          });
          return false;
        } else {
          wx.showToast({
            title: "下单失败!",
            duration: 2500
          });
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！err:createProductOrder',
          duration: 2000
        });
      }
    });
  },
  hasAdress: function () {
    let that = this;
    //提示添加收货地址
    wx.showModal({
      title: '提示',
      content: '请添加收货地址!',
      success: function (res) {
        if (res.confirm) {
          //console.log('用户点击确定');
          wx.chooseAddress({
            success: function (res) {
              wx.request({
                url: app.d.ceshiUrl + '/Api/Address/add_adds',
                data: {
                  user_id: app.d.userId,
                  receiver: res.userName,
                  tel: res.telNumber,
                  sheng: res.provinceName,
                  city: res.cityName,
                  quyu: res.countyName,
                  adds: res.detailInfo,
                  code: res.postalCode,
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {// 设置请求的 header
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  // success
                  var status = res.data.status;
                  if (status == 1) {
                    wx.showToast({
                      title: '保存成功！',
                      duration: 2000
                    });
                    that.loadProductDetail();
                  } else {
                    console.log(res.data.err);
                    wx.showToast({
                      title: res.data.err,
                      duration: 5000
                    });
                  }
                  // wx.redirectTo({
                  //   url: 'user-address/user-address?cartId=' + cartId
                  // });
                },
                fail: function () {
                  // fail
                  wx.showToast({
                    title: '网络异常！',
                    duration: 2000
                  });
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //调起微信支付
  wxpay: function (order) {
    //console.log(order);
    wx.request({
      url: app.d.ceshiUrl + '/Api/Wxpay/wxpay',
      data: {
        order_id: order.order_id,
        order_sn: order.order_sn,
        uid: this.data.userId,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (res) {
        if (res.data.status == 1) {
          var order = res.data.arr;
          wx.requestPayment({
            timeStamp: order.timeStamp,
            nonceStr: order.nonceStr,
            package: order.package,
            signType: 'MD5',
            paySign: order.paySign,
            success: function (res) {
              wx.showToast({
                title: "支付成功!",
                duration: 2000,
              });
              setTimeout(function () {
                wx.redirectTo({
                  url: '../user/dingdan?currentTab=1&otype=deliver',
                });
              }, 2500);
            },
            fail: function (res) {
              wx.showToast({
                title: '支付失败!',
                duration: 3000
              });
              setTimeout(function () {
                wx.redirectTo({
                  url: '../user/dingdan?currentTab=0&otype=pay',
                });
              }, 3200);
            }
          })
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！err:wxpay',
          duration: 2000
        });
      }
    })
  },


});