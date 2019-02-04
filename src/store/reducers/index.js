import {
  combineReducers
} from 'redux'
import counter from './counter'
import cache from './cache'
import globaldata from './globaldata'

export default combineReducers({
  counter,
  cache,
  globaldata
})
