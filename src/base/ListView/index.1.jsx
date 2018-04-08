import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import Scroll from '@/base/Scroll'
import { getData } from '@/common/dom'

import './style.styl'

const ITEM_HEIGHT = 18

@observer
class ListView extends Component {

  static propTypes = {
    list: PropTypes.any.isRequired
  }

  static defaultProps = {
    list: []
  }

  @observable currentIndex = 0;
  @observable listGroupHeight = [];
  touch = {};

  onTouchStart = e => {
    const touches = e.touches[0]
    const index = getData(e.target, 'index')
    this.touch.startY = touches.pageY
    this.touch.anchorIndex = index
    this.scrollTo(index)
    e.stopPropagation()
  }

  onTouchMove = e => {
    const touches = e.touches[0]
    const delta = Math.round((touches.pageY - this.touch.startY) / ITEM_HEIGHT)
    const index = parseInt(this.touch.anchorIndex, 10) + delta
    this.scrollTo(index)
    e.stopPropagation()
  }
  
  @action('设置anchorIndex')
  onScroll = e => {
    const newY = e.y
    const heights = this.listGroupHeight
    if (newY > 0) {
      this.currentIndex = 0
      return
    }

    for (let i = 0; i < heights.length - 1; i++) {
      const h1 = heights[i]
      const h2 = heights[i + 1]

      if (-newY >= h1 && -newY < h2) {
        this.currentIndex = i
        this.navList && (this.navList.children[i].className = 'item active')
      } else {
        this.navList && (this.navList.children[i].className = 'item')
      }
    }
  }

  @action('滚动回调')
  scrollTo (index) {
    const len = this.listGroup.children.length
    if (!index && index !== 0) {
      return
    }
    if (index < 0) {
      index = 0
    } else if (index >= len - 1) {
      index = len - 1
    }

    for (let i = 0; i < this.navList.children.length; i++) {
      this.navList.children[i].className = 'item'
    }

    this.navList.children[index].className = 'item active'
    this.currentIndex = index
    const ele = this.listGroup.children[index]
    this.scroll.scrollToElement(ele, 0)
  }

  @action('计算高低')
  calculateHeight () {
    let height = 0
    const listHeight = [0]
    const children = this.listGroup.children
    
    for (let i = 0; i < children.length; i++) {
      height += children[i].clientHeight
      listHeight.push(height)
    }
    this.listGroupHeight = listHeight
    this.navList && (this.navList.children[this.currentIndex].className = 'item active')
  }

  componentDidMount () {
    if (this.listGroupHeight.length === 0 && this.props.list.length !== 0) {
      this.calculateHeight()
    }
  }

  componentDidUpdate (prevProps) {
    console.log('update')
    if (this.listGroupHeight.length === 0 && this.props.list.length !== 0) {
      this.calculateHeight()
    }
  }

  render () {
    const list = this.props.list

    return (
      <Scroll 
        probeType={3}
        className="list-view" 
        onScroll={this.onScroll}
        ref={scroll => this.scroll = scroll}>
        <ul ref={listGroup => this.listGroup = listGroup}>
          {
            list.length !== 0 ? (
              list.map(singer => (
                <li key={singer.title} className="list-group">
                  <h2 className="list-group-title">{singer.title}</h2>
                  <ul>
                    {
                      singer.items.map(item => (
                        <li key={item.id} className="list-group-item">
                          <img src={item.avatar} alt="" className="avatar"/>
                          <span className="name">{item.name}</span>
                        </li>
                      ))
                    }
                  </ul>
                </li>
              ))
            ) : null
          }
        </ul>
        <ul 
          ref={navList => this.navList = navList}
          className="nav-list"
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}>
          {
            list.length !== 0 ? (
              list.map((item, index) => (
                <li 
                  className="item"
                  data-index={index}
                  key={index}>
                  {item.title.charAt(0)}
                </li>
              ))
            ) : null
          }
        </ul>
      </Scroll>
    )
  }
}

export default ListView
