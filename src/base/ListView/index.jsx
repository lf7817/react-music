import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Scroll from '@/base/Scroll'
import { getData } from '@/common/dom'

import './style.styl'

// const ITEM_HEIGHT = 18

class ListView extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired
  }

  static defaultProps = {
    list: []
  }

  touch = {
    startIndex: -1
  }

  state ={
    index: 0
  }

  touchStartHandler = e => {
    const touchStartIndex = parseInt(getData(e.target, 'index'), 10)
    this.touch.startIndex = touchStartIndex
    this.setState({
      index: touchStartIndex
    })
    e.stopPropagation()
  }

  componentDidUpdate () {
    console.log('update')
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log('current ',this.state.index)
    console.log('next ',nextState.index)
    if (this.state.index === nextState.index){
      return false
    }
    return true
  }

  render () {
    const { list } = this.props

    return (
      <Scroll className="list-view">
        <ul>
          {
            list.map(item => (
              <li key={item.title} className="list-group">
                <h2 className="list-group-title">{item.title}</h2>
                <ul>
                  {
                    item.items.map(singer => (
                      <li key={singer.id} className="list-group-item">
                        <img className="avatar" src={singer.avatar} alt=""/>
                        <span className="name">{singer.name}</span>
                      </li>
                    ))
                  }
                </ul>
              </li>
            ))
          }
        </ul>
        <ul 
          className="nav-list"
          onTouchStart={this.touchStartHandler}>
          {
            list.map((item, index) => (
              <li 
                className="item" 
                key={index}
                data-index={index}>
                {item.title.charAt(0)}
              </li>
            ))
          }
        </ul>
      </Scroll>
    )
  }
}

export default ListView
