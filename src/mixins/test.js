import wepy from 'wepy'

import {
  connect
} from 'wepy-redux';
@connect({
  num(state) {
    return state.counter.num
  },
  imgUrl(state) {
    return state.globdata.imgUrl
  }
})

export default class testMixin extends wepy.mixin {
  data = {
    mixin: 'This is mixin data.'
  }
  methods = {
    tap() {
      this.mixin = 'mixin data was changed'
      console.log('mixin method tap')
    }
  }

  onShow() {
    console.log('mixin onShow')
  }

  onLoad() {
    console.log('mixin onLoad')
  }
}
