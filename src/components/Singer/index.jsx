import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import ListView from '@/base/ListView'

import './style.styl'

@inject('singerStore')
@observer
class Singer extends Component {
  _getSinger () {
    const { singerStore } = this.props
    if (!singerStore.singers.length) {
      singerStore.requestSingerList()
    }
  }

  setPosition = (scrollY, anchorIndex) => {
    this.scrollY = scrollY
    this.anchorIndex = anchorIndex
  }

  componentDidMount () {
    setTimeout(() => {
      this._getSinger()
    }, 500);
  }

  componentDidUpdate (preProp) {
    console.log(1)
  }

  componentWillUnmount () {
    if (this.scrollY) {
      this.props.singerStore.setPosition(this.scrollY, this.anchorIndex)
    } 
  }

  render () {
    const { singers, scrollY, anchorIndex } = this.props.singerStore
    const list = Array.prototype.slice.call(singers)
    
    return (
      <div className="singer">
        <ListView 
          list={list} 
          startScrollY={scrollY}
          anchorIndex={anchorIndex}
          setPosition={this.setPosition}/>
      </div>
    )
  }
}

export default Singer
