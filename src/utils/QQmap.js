import QQMapWX from '@/utils/qqmap-wx-jssdk';
export default class QQmap {
  static qqmapsdk = {};
  constructor() {
    this.qqmapsdk = new QQMapWX({
      key: '6QIBZ-NHXR3-KYO3T-YZAGT-4ADW6-NTBF5'
    });
  }

}
