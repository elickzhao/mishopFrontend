import api from '@/api/addresses';
import Tips from '@/utils/Tips';
import {
  ADD_ADDRESS,
  INIT_ADDRESS,
  SAVE_ADDRESS
} from '../types/address'
import {
  createAction
} from 'redux-actions'

export const addAddress = createAction(ADD_ADDRESS, globdata => globdata)
export const initAddress = createAction(INIT_ADDRESS, address => address)
export const saveAddress = createAction(SAVE_ADDRESS, address => address)

// 远程初始化
export const initAddressAsync = createAction(INIT_ADDRESS, async uid => {
  // 错误请求
  // const json = await api.getUserAddress({
  //   query: {
  //     uid: uid
  //   }
  // });

  // 正确请求 
  const json = await api.getUserAddress({
    uid: uid
  });
  // 错误提示
  if (json.serverCode) {
    // console.log(json, 'dddddddddddddddddd')
    Tips.error(json.message);
    // console.log(json.message, '---------------')
    const error = {};
    error.title = '错误信息';
    error.message = json.message;
    throw error;
  }
  // this.hasError(json);
  return json.list
})
