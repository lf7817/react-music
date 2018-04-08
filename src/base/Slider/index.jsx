import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BetterScroll from 'better-scroll'
import { addClass } from '@/common/dom'

import './style.styl'

// @observer
class Slider extends Component {

  static propTypes = {
    loop: PropTypes.bool,
    autoPlay: PropTypes.bool,
    interval: PropTypes.number,
    startIndex: PropTypes.number,
    setSliderIndex: PropTypes.func
  }
  
  static defaultProps = {
    loop: true,
    autoPlay: true,
    interval: 4000,
    startIndex: 0
  }

  state ={
    currentIndex: 0,
    dots: []
  }

  componentDidMount () {
    this.update()
    window.addEventListener('resize', this._resizeHandler)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._resizeHandler)
  }

  init () {
    this._setSliderWidth()
    this._initDots()
    this._initBetterScroll()

    if (this.props.autoPlay) {
      this._play()
    }
  }

  update () {
    if (this.slider) {
      this.slider.destroy()
    }
    this.init()
    this.slider.goToPage(this.props.startIndex, 0, 0)
    this.setState({
      currentIndex: this.props.startIndex
    })
  }

  refresh () {
    this._setSliderWidth(true)
    this.slider.refresh()
  }

  _setSliderWidth (isResize) {
    const { loop } = this.props
    let width = 0
    const oneSliderWidth = this.sliderWrapper.clientWidth
    this.children = this.sliderGroup.children

    for (let i = 0; i < this.children.length; i ++) {
      let child = this.children[i]
      child.style.width = oneSliderWidth + 'px'
      width += oneSliderWidth
      addClass(child, 'slider-item')
    }

    if (loop && !isResize) {
      width += 2 * oneSliderWidth
    }

    this.sliderGroup.style.width = width + 'px'
  }

  _initDots () {
    this.setState({
      dots: new Array(this.children.length).fill('')
    })
  }

  _play () {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.slider.next()
    }, this.props.interval);
  }

  _initBetterScroll () {
    this.slider = new BetterScroll(this.sliderWrapper, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      click: true,
      bounce: false,
      stopPropagation: true,
      snap: {
        loop: this.props.loop,
        threshold: 0.3,
        speed: 400
      }
    })

    this.slider.on('scrollEnd', this._onScrollEnd)

    this.slider.on('touchEnd', () => {
      if (this.props.autoPlay) {
        this._play()
      }
    })

    this.slider.on('beforeScrollStart', () => {
      if (this.props.autoPlay) {
        clearTimeout(this.timer)
      }
    })
  }

  _onScrollEnd = () => {
    this.setState({
      currentIndex: this.slider.getCurrentPage().pageX
    })
  
    this.props.setSliderIndex(this.currentIndex)
    if (this.props.autoPlay) {
      this._play()
    }
  }

  _resizeHandler = () => {
    if (!this.slider) {
      return 
    }
    clearTimeout(this.resizeTimer)
    clearTimeout(this.timer)
    this.resizeTimer = setTimeout(() => {
      if (this.props.autoPlay) {
        this._play()
      }
      this.refresh()
    }, 60)
  }

  render () {
    return (
      <div className="slider" ref={sliderWrapper => this.sliderWrapper = sliderWrapper}>
        <div className="slider-group" ref={sliderGroup => this.sliderGroup = sliderGroup}>
          {this.props.children}
        </div>
        <div className="dots">
          {
            this.state.dots.map((dot, index) => (
              <span 
                key={index} 
                className={`dot ${this.state.currentIndex === index ? 'active' : ''}`}></span>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Slider
