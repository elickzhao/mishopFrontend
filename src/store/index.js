import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import rootReducer from './reducers'
import {
  createLogger
} from 'redux-logger'

const logger = createLogger({
  diff: true, // 输出不同
  collapsed: true //折叠形式
})

export default function configStore () {
  const store = createStore(rootReducer, applyMiddleware(promiseMiddleware,logger))
  return store
}