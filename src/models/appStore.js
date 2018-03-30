import { observable, action, configure } from 'mobx'
import RecommendStore from './recommendStore'

configure({
  enforceActions: true
})

class AppStore {
  name = 'appstore'
  constructor () {
    this.recommendStore = new RecommendStore(this)
  }
}

export default AppStore
