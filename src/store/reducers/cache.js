import { handleActions } from 'redux-actions'
import { SAVE } from '../types/cache'

export default handleActions({
  [SAVE] (state, action) {
    const {key, value} = action.payload;
    return {
      ...state,
      [key]: value
    }
  }
}, {
  miniNum:null
  // member: null,
  // card: null,
  // reduce: null,
  // shop: null,
  // status: null,
  // notices: null,
  // categories: null,
  // limit: null
})
