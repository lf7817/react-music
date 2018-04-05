import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('appStore')
@observer
class Singer extends Component {

  componentDidMount () {
    setTimeout(() => {
      this._getSinger()
    }, 3000);
    
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
    const { singerStore } = this.props.appStore
    
    return (
      <div>{singerStore.singers.length}</div>
    )
  }
}

export default Singer
