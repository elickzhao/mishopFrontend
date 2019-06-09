import wepy from 'wepy'
import { imgMainUrl } from '@/config/index'
import {
  connect
} from 'wepy-redux';
@connect({
  num (state) {
    return state.counter.num
  },
  imgUrl (state) {
    return state.globaldata.imgUrl
  }
})

export default class globalDataMixin extends wepy.mixin {
  data = {
    imgBaseUrl: ''
  }
  onLoad () {
    // console.log('globaldata onLoad')
    this.imgBaseUrl = this.imgUrl;
    this.$apply()
  }
  methods = {
    imgError () {
      this.imgBaseUrl = imgMainUrl
      this.$apply()
    }
  }
}
