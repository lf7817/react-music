import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import ListView from '@/base/ListView'

import './style.styl'

@inject('appStore')
@observer
class Singer extends Component {

  componentDidMount () {
    // setTimeout(() => {
      this._getSinger()
    // }, 3000);
  }

  componentDidUpdate (preProp) {
    console.log(1)
  }

  _getSinger () {
    const { singerStore } = this.props.appStore
    if (!singerStore.singers.length) {
      singerStore.requestSingerList()
    }
  }

  render () {
    const { singers } = this.props.appStore.singerStore
    
    return (
      <div className="singer">
        <ListView list={singers}/>
      </div>
    )
  }
}

export default Singer
