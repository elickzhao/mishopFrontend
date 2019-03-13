/*
 * @Author: elick
 * @LastEditors: elick
 * @Date: 2019-02-16 12:07:59
 * @LastEditTime: 2019-03-12 16:48:20
 * @Description:  悬浮按钮栏
 */
import wepy from 'wepy';

export default class TestMixin extends wepy.mixin {
  data = {
    showGoTop: false,
    buttons: [{
        label: '首页',
        icon: 'data:image/png;base64,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'
      },
      {
        label: '分类',
        icon: 'data:image/png;base64,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'
      },
      {
        label: '购物车',
        icon: 'data:image/png;base64,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'
      },
      {
        label: '个人',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAM3SURBVGje7VlNSBRRHP8/tU1dd7PNwkwiUqFIb5pGlJZEardIsOwi5iU6SF+XDhVBRFFJdKlbH0hdgkBIO3kptSKiEgKJWAikQrKgxLD9dZB982b2zex7b2ZZof2f/sv+vuYx8z5mGBkVYtRGzdRI1RSmWfpAYzRKI2zeTE3POorTcKtZ9KAgk+YRXEP6OoH8zNgfUDBPVnPQ5kUY1LAHgEvIC86+HDMO+UkcQpEt4EG8dWAmEAnGvtIh/Bg1LsgqPLIhZ7DSv32pw357Gvw2GzqOQn/2DKO2ay9R4JRgSODc8xegS5C6CPXYVwXeHnP7kCBzXYtJuM2ZC8bPA1q5yGfdGQ4hzHN2vTvOO1s37/azBb0A7A91WGzTEfjCr8FgckUhZ78ysycu8NuIzzh/2h0V3HRpWLkAuQC5ALkASzkAI0oeNIpUdwIu9ct0BKZ4Z3LcCPEubhrAWsVWGAQo5d070wDPebfJIIC1d35tGuAl7zpIv1p598aATUSEMF/R/+rfhvjG2Qp7aTeR91xkgyZzjXU28MKlmwesvfBhzeztvBswvn4irBU25iENHsN3ztvoIwARJrlQtwaribPmfE5iaBfGIKrIyUOcc3r8+RMKhAB3FDl9AifsMwAROgS5Ywr4RgF/1Lc9Ech2Qj6VBt0kYOewLIAAtmcaAPo9kLttyNpA7ImIUG8TdlmabKdpoDMweyIi7BCkm1wwmwVMr5qu4o4IMWoRfrpNScuFPiG+xPJ37eW4DHtVuiBXOXD9qjOHu/l63IKzRjzwD1PQZ1Fmal6DB0itYa/FFWE8k3AGUKFrXodhqXmdAncXPkm4dxUXJRAaMCERGES1cnzCVryQaAxhizeRYSemJMSbbredp1otnki0xtEgXR+Rj7aUN8IAcAGr9c25ahXuSzQ/ogXMPmRHIKuTMNmOO0Osww2J9k/sTQIiGJcA+lDs35yHKMN5iUccFYQSfE35o0tn+6UcIorjqRnIMTw/sC9DH1wWQxSj1xnAqjk0226NTIUIoRPTsgD+Py6oh4glTRmSD2WCZXDoUwIwSix2S/kFxX8SwLoHsjYCY9kOcC7LAdhTupJF/zP/AOvS/D0NTmDBAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTA0VDExOjQ3OjQ1KzA4OjAwI6N5UAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0wNFQxMTo0Nzo0NSswODowMFL+wewAAAAASUVORK5CYII='
      }
    ]
  };
  queryMultipleNodes() {
    var that = this;

    var query = wx.createSelectorQuery()
    query.select('#container').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      res[0].top // 节点的上边界坐标
      // console.log(res[0].top);
      // 如果顶部的距离超过300   就显示GoTop按钮
      if (res[0].top < -150) {
        // console.log("false");
        if (that.showGoTop == false) {
          // console.log("aaaa");
          that.showGoTop = true;
          that.$apply();
        }
      } else {
        if (that.showGoTop == true) {
          // console.log("bbbb");
          that.showGoTop = false;
          that.$apply();
        }
      }
    })
  }
  //监听窗口滚动 滚动的距离等等  异步接口 不会到达一个点后立即显示过渡效果 得等到异步操作后才会起效
  getScrollOffset() {
    let that = this

    wx.createSelectorQuery().selectViewport().scrollOffset(function (res) {
      // res.id // 节点的ID
      // res.dataset // 节点的dataset
      // res.scrollLeft // 节点的水平滚动位置
      res.scrollTop // 节点的竖直滚动位置
      // console.log(res.scrollTop);
      if (res.scrollTop > 150 && that.showGoTop != true) {
        that.showGoTop = true;
        that.$apply();
        // console.log(that.showGoTop);
      }
      if (res.scrollTop == 0 && that.showGoTop != false) {
        that.showGoTop = false;
        that.$apply();
        // console.log(that.showGoTop);
      }
    }).exec()
  }

  methods = {
    buttonClicked(e) {
      const {
        index
      } = e.detail
      index === 0 && wx.switchTab({
        url: '/pages/home/home'
      })
      index === 1 && wx.switchTab({
        url: '/pages/goods/category'
      })
      index === 2 && wx.switchTab({
        url: '/pages/shop_cart/shop_cart'
      })
      index === 3 && wx.switchTab({
        url: '/pages/personal_center/personal_center'
      })
    }
  }
  onPageScroll() {
    this.getScrollOffset();
  }
}
