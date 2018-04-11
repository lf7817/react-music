import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Scroll from '@/base/Scroll'
import { getData } from '@/common/dom'

import './style.styl'

const ITEM_HEIGHT = 18

class ListView extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired
  };

  static defaultProps = {
    list: []
  };

  touch = {
    startIndex: -1
  };

  listItemHeights = [];

  state ={
    index: 0
  };

  touchStartHandler = e => {
    const touch = e.touches[0]
    const touchStartIndex = parseInt(getData(e.target, 'index'), 10)
    this.touch.startIndex = touchStartIndex
    this.touch.startY = touch.pageY
    this.scrollTo(touchStartIndex)
    e.stopPropagation()
  }

  touchMoveHandler = e => {
    const touch = e.touches[0]
    const delta = Math.round((touch.pageY - this.touch.startY) / ITEM_HEIGHT)
    const anchorIndex = this.touch.startIndex + delta
    this.scrollTo(anchorIndex)
    e.stopPropagation()
  }

  scrollTo (index) {
    if (!index && index !== 0) {
      return
    }

    const children = this.listGroup.children
    const len = children.length

    if (index < 0) {
      index = 0
    } else if (index >= len - 1) {
      index = len - 1
    }

    this.scroll.scrollToElement(children[index], 0)
  }

  calculateHeight () {
    if (this.listItemHeights.length !== 0 || this.props.list.length === 0) {
      return
    }

    let height = 0
    const listItemHeights = [height]
    const children = this.listGroup.children
    
    for (let i = 0; i < children.length - 1; i ++) {
      height += children[i].clientHeight
      listItemHeights.push(height)
    }
    this.listItemHeights = listItemHeights
  }

  componentDidMount () {
    console.log('mount')
    this.calculateHeight()
  }

  componentDidUpdate () {
    console.log('update')
    this.calculateHeight()
  }

  render () {
    const { list } = this.props

    return (
      <Scroll className="list-view" ref={scroll => this.scroll = scroll}>
        <ul ref={listGroup => this.listGroup = listGroup}>
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
          onTouchStart={this.touchStartHandler}
          onTouchMove={this.touchMoveHandler}>
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
