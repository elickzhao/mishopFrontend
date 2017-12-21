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
      console.log(wx.getStorageSync('carnum'));
    }
  })
}


module.exports = {
  shopCarAdd: shopCarAdd,
  shopCarDel: shopCarDel,
}