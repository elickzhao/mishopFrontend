/**
 * 购物车增加
 */
function shopCarAdd(data) {
  var value = wx.getStorageSync('carnum');
  if (!value) {
    value = 0;
  }
  value++;

  wx.setStorage({
    key: 'carnum',
    data: value,
    success: function (res) {
      //console.log(wx.getStorageSync('carnum'))
      data.setData({
        carNum: value
      });
    }
  })
}

/**
 * 购物车减少
 */
function shopCarDel(e) {
  var value = wx.getStorageSync('carnum');
  if (!value) {
    value = 0;
  }

  value -= e;

  wx.setStorage({
    key: 'carnum',
    data: value,
    success: function (res) {
      //console.log(wx.getStorageSync('carnum'));
    }, fail(e) {
      console.log(e);
    }
  })
}

/**
 * 程序启动检查购物车
 * 因为有可能清除本地缓存 所以打开软件必须同步一下才行
 */
function shopCarCheck(d) {
  var value = wx.getStorageSync('carnum');
  if (!value) {
    wx.request({
      url: d.ceshiUrl + '/Api/Shopping/index',
      method: 'post',
      data: {
        user_id: d.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var carts = [];
        carts = res.data.cart;
        if (carts) {
          // 计算总数
          var total = 0;
          for (var i = 0; i < carts.length; i++) {
            total += parseInt(carts[i].num);
          }
          //console.log(total);
          wx.setStorageSync('carnum',total);
        }
      },
      fail(e) {
        console.log(e);
      }
    });
  }
}


module.exports = {
  shopCarAdd: shopCarAdd,
  shopCarDel: shopCarDel,
  shopCarCheck: shopCarCheck,
}