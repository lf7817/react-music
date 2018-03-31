import { observable, configure, action, runInAction } from 'mobx'
import { getRecommend } from '@/api/recommend'

configure({
  enforceActions: true
})

class RecommendStore {
  @observable name = 'recommend'
  @observable sliderList = []

  constructor (appStore) {
    this.appStore = appStore
  }
  
  @action('获取slider')
  requestSlider = async () => {
    try {
      const res = await getRecommend()
      runInAction(() => {
        if (res.code === 0) {
          this.sliderList = res.data.slider
        }
      })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export default RecommendStore
