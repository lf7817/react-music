import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Scroll from '@/base/Scroll'
import Loading from '@/base/Loading'
import { getData } from '@/common/dom'

import './style.styl'

const ITEM_HEIGHT = 18
const FIX_TITLE_HEIGHT = 30

class ListView extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired
  };

  static defaultProps = {
    list: []
  };

  anchorIndex = 0;
  scrollY = 0;
  listItemHeights = [];
  state ={
    index: 0
  };
  touch = {
    startIndex: -1
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
    this.scroll.stop()
    if (!index && index !== 0) {
      return
    }

    const children = this.listGroup.children
    const len = children.length

    if (index < 0) {
      index = 0
      this.scrollY = 0
    } else if (index >= len - 1) {
      index = len - 1
    }
    
    setTimeout(() => {
      this.scrollY = -this.listItemHeights[index]
      this.anchorIndex = index
      this.setNavlistClassName(index)
      this.setFixTitle(this.anchorIndex)
      this.scroll.scrollToElement(children[index], 0)
    }, 100)
  }

  calculateHeight () {
    let height = 0
    const listItemHeights = [height]
    const children = this.listGroup.children
    
    for (let i = 0; i < children.length - 1; i ++) {
      height += children[i].clientHeight
      listItemHeights.push(height)
    }
    this.listItemHeights = listItemHeights
  }

  scrollHandler = e => {
    this.scrollY = e.y
    this.hideFixTitle(this.scrollY )
    this.anchorIndex = this.calculateAnchorIndex()
    this.setFixTitleOffset(this.scrollY, this.anchorIndex)
    this.setFixTitle(this.anchorIndex)
    this.setNavlistClassName(this.anchorIndex)
    this.props.setPosition && this.props.setPosition(this.scrollY, this.anchorIndex)
  }

  calculateAnchorIndex () {
    if (this.scrollY > 0) {
      return 0
    }

    for (let i = 0; i < this.listItemHeights.length - 1; i++) {
      const h1 = this.listItemHeights[i]
      const h2 = this.listItemHeights[i + 1]

      if (-this.scrollY >= h1 && -this.scrollY < h2) {
        return i
      }
    }

    return this.listItemHeights.length - 1
  }

  setFixTitle (anchorIndex) {
    this.title && (this.title.innerHTML = this.props.list[anchorIndex].title)
  }

  setFixTitleOffset (scrollY, anchorIndex) {
    if (!this.title) {
      return
    }

    const delta = this.listItemHeights[anchorIndex + 1] - FIX_TITLE_HEIGHT + scrollY

    if (delta < 0) {
      this.title.style.transform = `translate3d(0, ${delta}px, 0)`
    } else {
      this.title.style.transform = `translate3d(0, 0, 0)`
    }
  }

  hideFixTitle (scrollY) {
    if (!this.title) {
      return
    }

    if (scrollY > 0) {
      this.title.style.display = 'none'
    } else {
      this.title.style.display = 'block'
    }
  }

  setNavlistClassName (anchorIndex) {
    if (!this.navList) {
      return
    }

    for (let i = 0; i < this.navList.children.length; i++) {
      if (i === anchorIndex) {
        this.navList.children[i].className = 'item active'
      } else {
        this.navList.children[i].className = 'item'
      }
    }
  }

  init () {
    if (this.listItemHeights.length !== 0 || this.props.list.length === 0) {
      return
    }

    const {anchorIndex, startScrollY } = this.props

    this.calculateHeight()
    if (anchorIndex && startScrollY) {
      this.setInitValue()
    } else {
      this.setNavlistClassName(this.anchorIndex)
      this.setFixTitle(this.anchorIndex)
    }
    
    
    console.log('init')
  }

  setInitValue () {
    this.anchorIndex = this.props.anchorIndex
    this.scroll.scrollTo(0, this.props.startScrollY, 0)
    this.setNavlistClassName(this.anchorIndex)
    this.setFixTitle(this.anchorIndex)
    this.setFixTitleOffset(this.props.startScrollY, this.anchorIndex)
  }

  componentDidMount () {
    console.log('mount')
    this.init()
  }

  componentDidUpdate () {
    console.log('update')
    this.init()
  }

  render () {
    const { list } = this.props

    return (
      <Scroll 
        className="list-view" 
        ref={scroll => this.scroll = scroll}
        probeType={3}
        onScroll={this.scrollHandler}>
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
          ref={nav => this.navList = nav}
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
        {
          list.length !== 0 ? <div className="fix-title" ref={title => this.title = title}></div> : null
        }
        {
          list.length === 0 ? <div style={{marginTop: '30px'}}>
            <Loading title="正在加载中" />
          </div> : null
        }
      </Scroll>
    )
  }
}

export default ListView
