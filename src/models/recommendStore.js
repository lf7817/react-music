import { observable, configure, action, runInAction } from 'mobx'
import { getRecommend, getDiscList } from '@/api/recommend'

configure({
  enforceActions: true
})

class RecommendStore {
  @observable name = 'recommend'
  @observable sliderList = []
  @observable startIndex = 0
  @observable discList = []
  @observable pos = null
  constructor (appStore) {
    this.appStore = appStore
  }
  
  @action('设置初始sliderIndex')
  setSliderIndex = (startIndex) => {
    this.startIndex = startIndex
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

  @action('获取推荐歌单')
  requestDiscList = async () => {
    try {
      const res = await getDiscList()
      runInAction(() => {
        if (res.data.code === 0) {
          this.discList = res.data.data.list
        }
      })
    } catch (e) {
      throw new Error(e)
    }
  }
  
  @action('设置scroll滚动的位置')
  setScrollPos = pos => {
    this.pos = pos
  }
}

export default RecommendStore
