import { observable, action, runInAction } from 'mobx'
import { getRecommend, getDiscList } from '@/api/recommend'
import { ERR_OK } from '@/constant'

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
        if (res.code === ERR_OK) {
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
        if (res.data.code === ERR_OK) {
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
