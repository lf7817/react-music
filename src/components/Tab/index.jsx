import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { getData, getAttr } from '@/common/dom'
import history from '@/common/history'
import PropTypes from 'prop-types'

import './style.styl'

const UNDER_LINE_WIDTH = 28
class Tab extends Component {

  static propTypes = {
    navs: PropTypes.array.isRequired
  }

  state = {
    anchorIndex: 0
  };

  anchors = [];

  componentDidMount () {
    this.calculateAnchorPosition()
    this.initPosition()
    
    history.listen(location => {
      setTimeout(() => this.initPosition(), 0)
    })
  }

  calculateAnchorPosition () {
    this.children = this.wrapper.children
    this.len = this.wrapper.children.length - 1
    const itemWidth = this.wrapper.clientWidth / this.len

    for (let i = 0; i < this.len; i++) {
      this.anchors.push((itemWidth - UNDER_LINE_WIDTH) / 2 + itemWidth * i)
    }
  }

  clickHandler = (e) => {
    const anchorIndex = parseInt(getData(e.target, 'index'), 10)
    this.setState({
      anchorIndex
    })
  }

  initPosition () {
    for (let i = 0; i < this.len; i++) {
      if (getAttr(this.children[i], 'aria-current') === 'true') {
        this.setState({
          anchorIndex: i
        })
        return
      }
    }
  }

  render () {
    return (
      <div className="app-tab" ref={wrapper => this.wrapper = wrapper}>
        {
          this.props.navs.map((nav, index) => (
            <NavLink 
              key={nav.path} 
              to={nav.path} 
              className="tab-item" 
              data-index={index}
              activeClassName="active" 
              onClick={this.clickHandler}
              >
              <span className="tab-link" data-index={index}>{nav.title}</span>
            </NavLink>
          ))
        }
        <div className="tab-under-line" 
          style={{
            transform: `translate3d(${this.anchors[this.state.anchorIndex]}px, 0, 0)`,
            width: UNDER_LINE_WIDTH
          }}></div>
      </div>
    )
  }
}

export default Tab
