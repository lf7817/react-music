import { configure } from 'mobx'
import RecommendStore from './recommendStore'
import SingerStore from './singerStore'

configure({
  enforceActions: true
})

class AppStore {
  constructor () {
    this.recommendStore = new RecommendStore(this)
    this.singerStore = new SingerStore(this)
  }
}

export default AppStore
