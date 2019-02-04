import wepy from 'wepy'

import {
  connect
} from 'wepy-redux';
@connect({
  num(state) {
    return state.counter.num
  },
  imgUrl(state) {
    return state.globaldata.imgUrl
  }
})

export default class globalDataMixin extends wepy.mixin {
  onLoad() {
    // console.log('globaldata onLoad')
  }
}
