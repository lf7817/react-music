import { observable, configure } from 'mobx'

configure({
  enforceActions: true
})

class RecommendStore {
  @observable name = 'recommend'
  
  constructor (appStore) {
    this.appStore = appStore
  }
}

export default RecommendStore
