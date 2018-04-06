import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observable } from 'mobx'
import { observer, action } from 'mobx-react'
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
  @observable scrollY = 0;
  
  touch = {};

  onTouchStart = e => {
    const touches = e.touches[0]
    const index = getData(e.target, 'index')
    const ele = this.listGroup.children[index]
    this.touch.startY = touches.pageY
    this.touch.anchorIndex = index
    this.scrollTo(ele, 0)
    e.stopPropagation()
  }

  onTouchMove = e => {
    const touches = e.touches[0]
    const delta = Math.round((touches.pageY - this.touch.startY) / ITEM_HEIGHT)
    const index = parseInt(this.touch.anchorIndex, 10) + delta
    this.scrollTo(index)
    e.stopPropagation()
  }
  
  onScroll = e => {
    this.scrollY = e.y
  }

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
    
    console.log(index)
    const ele = this.listGroup.children[index]
    this.scroll.scrollToElement(ele, 0)
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
          className="nav-list"
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}>
          {
            list.length !== 0 ? (
              list.map((item, index) => (
                <li 
                  className={`item ${this.currentIndex === index ? 'active' : ''}`}
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
