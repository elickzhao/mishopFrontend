import {
  handleActions
} from 'redux-actions'
import {
  GLOBAL_ADD
} from '../types/globaldata'

import {
  baseUrl,
  hostUrl,
  imgUrl
} from '@/config'

const globaldata = {
  hostUrl: hostUrl,
  baseUrl: baseUrl,
  imgUrl: imgUrl
}

export default handleActions({
  [GLOBAL_ADD](state, action) {
    const {
      key,
      value
    } = action.payload
    console.log(action.payload)
    return {
      ...state,
      [key]: value
    }
  }
}, {
  ...globaldata
})