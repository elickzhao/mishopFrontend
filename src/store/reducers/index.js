import {
  combineReducers
} from 'redux'
import counter from './counter'
import cache from './cache'
import globaldata from './globaldata'
import address from './address'

export default combineReducers({
  counter,
  cache,
  globaldata,
  address
})
