import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Scroll from '@/base/Scroll'
import { getData } from '@/common/dom'

import './style.styl'


@observer
class ListView extends Component {

  static propTypes = {
    list: PropTypes.any.isRequired
  }

  static defaultProps = {
    list: []
  }

  @observable currentIndex = 0

  onTouchStart = e => {
    const index = getData(e.target, 'index')
    const ele = this.listGroup.children[index]
    this.scroll.scrollToElement(ele, 0)
    e.stopPropagation()
  }

  onTouchMove = e => {
    e.stopPropagation()
  }

  render () {
    const list = this.props.list

    return (
      <Scroll className="list-view" ref={scroll => this.scroll = scroll}>
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
