/*
 * @Author: elick
 * @LastEditors: elick
 * @Description: 收货地址reduce
 * @Date: 2019-03-08 17:06:34
 * @LastEditTime: 2019-03-09 04:30:15
 */
import { handleActions } from 'redux-actions';
import { ADD_ADDRESS,INIT_ADDRESS } from '../types/address';

const address = {
  list:[],
  default:'',
  current:''
}

export default handleActions({
  [ADD_ADDRESS](state, action) {
    const {
      key,
      value
    } = action.payload
    console.log(action.payload)
    return {
      ...state,
      [key]: value
    }
  },
  [INIT_ADDRESS](state,action){
    let address = action.payload
    state.list = address
    address.map(item =>{
      if(item.is_default){
        state.default = state.current = item.id
      }
    })
    return {...state}
  }
}, {
  ...address
})