import { configure } from 'mobx'
import RecommendStore from './recommendStore'

configure({
  enforceActions: true
})

class AppStore {
  constructor () {
    this.recommendStore = new RecommendStore(this)
  }
}

export default AppStore
