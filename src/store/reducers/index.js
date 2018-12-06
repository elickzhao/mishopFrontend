import { combineReducers } from 'redux'
import counter from './counter'
import cache from './cache'

export default combineReducers({
  counter,cache
})