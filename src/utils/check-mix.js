import wepy from 'wepy';
import {
  USER_INFO,
  USER_SPECICAL_INFO
} from "./constant";
import api from "../api/api";
import tip from "../utils/tip";

export default class AuthCheckMixin extends wepy.mixin {
  data = {
    backUrl: ""
  };

  async authorize() {
    //console.log("authorize-check")
    let that = this;
    let userInfo = wepy.getStorageSync(USER_INFO);
    let userSpecialInfo = wepy.getStorageSync(USER_SPECICAL_INFO);
    //老版本兼容
    if (!userInfo) {
      //console.log("authorize-check1")
      let res = await wepy.getSetting();
      // 查看是否授权
      if (res.authSetting["scope.userInfo"]) {
        //console.log("scope.userInfo == " + res.authSetting["scope.userInfo"]);
        wx.getUserInfo({
          success: function (res) {
            console.log(res.userInfo);
            userInfo = res.userInfo;
            wepy.setStorageSync(USER_INFO, userInfo);
          }
        });
      } else {
        let url = (that.backUrl != "") ? "/pages/authorize?back=" + this.backUrl : "/pages/authorize"
        //console.log(url)
        // let aa = tip.confirm('请先授权!否则无法购买商品!');
        // aa.then(function (result) {
        //   wepy.redirectTo({
        //     url: url
        //   });
        // }).catch(function (reason) {          
        //   console.log('取消：' + reason);
        //   //this.onLoad()   
        //   //return false;
        // });

        wx.showModal({
          title: '提示',
          content: '请先授权!否则无法购买商品!',
          showCancel: false, //是否显示取消按钮,
          confirmText: '授权', //确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: '#3CC51F', //确定按钮的文字颜色,
          success: function (res) {
            if (res.confirm) {
              wepy.redirectTo({
                url: url
              });
            }
          }
        })
        this.$apply();
      }
    } else if (userSpecialInfo == "") {
      console.log("authorize-check2")
      let res = await wepy.login();
      if (res.code) {
        let rlt = await api.wxJsCode2Session({
          query: {
            code: res.code
          }
        });
        //console.log(rlt)
        if (rlt.data.openid != "") {
          // console.log("--------  rlt.data  ========  ")
          // console.log(rlt.data)
          let data = rlt.data;
          if (data.openid) {
            let json = await api.user2session({
              query: {
                openId: data.openid,
                NickName: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl,
                gender: userInfo.gender
              }
            });
            //console.log(json);
            if (json.data.code == 0) {
              userSpecialInfo = json.data.data;
              //console.log(userSpecialInfo);
              userSpecialInfo.openId = data.openid;
              //console.log(userSpecialInfo);
              wepy.setStorageSync(USER_SPECICAL_INFO, userSpecialInfo);
            } else {
              console.log(json.data.msg);
              wepy.redirectTo({
                url: "/pages/authorize?back=coupon_xianxia"
              });
            }
          }
        } else {
          let res = await wepy.showModal({
            title: "appid有误",
            content: "授权失败"
          });
        }
      }
    }
    that.$apply();
  }

  methods = {

  }
}
