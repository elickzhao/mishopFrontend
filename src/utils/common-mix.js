import wepy from 'wepy';
import {
  USER_INFO,
  USER_SPECICAL_INFO
} from "./constant";
import api from "../api/api";


export default class CommonMixin extends wepy.mixin {
  data = {
    // /openid: ""
  };

  //formId提交表单id或者支付id   order_id 订单id这样从数据库里取订单信息  flag 模版的id的别称 支付成功,未支付等信息模版
  async sendMessage(formId,order_id,flag,msg) {
    let userSpecialInfo = wepy.getStorageSync(USER_SPECICAL_INFO) || {};
    let openid = userSpecialInfo.openid
    //console.log(formId+'--'+order_id+'--'+flag+'--'+openid+'--'+msg)
    //必须有openid
    if (openid) {
      let json = await api.messageInfo({
        query: {
          openid: openid,
          fid: formId,
          oid:order_id,
          flag:flag,
          msg:msg
        }
      });
      // console.log(json)
      if (json.data.code == 0) {
        console.log(json.data.data);  
        console.log("成功!");  
      } else {
        console.log("失败!");
      }
    }
  }
  // async sendMessage(formId) {
  //   let userSpecialInfo = wepy.getStorageSync(USER_SPECICAL_INFO) || {};
  //   let openid = userSpecialInfo.openid

  //   //必须有openid
  //   if (openid) {
  //     let json = await api.messageInfo({
  //       query: {
  //         openid: this.openid,
  //         fid: formId
  //       }
  //     });
  //     console.log(json);
      
  //     // if (json.data.code == 0) {
  //     //   console.log("成功!");  
  //     // } else {
  //     //   console.log("失败!");
  //     // }
  //   }
  // }
  methods = {

  }
}
