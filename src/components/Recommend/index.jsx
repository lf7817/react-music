import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Slider from '@/base/Slider'

import './style.styl'

@inject('appStore')
@observer
class Recommend extends Component {
  componentDidMount () {
    this.getSlider()
  }

  getSlider () {
    const { recommendStore } = this.props.appStore
    if (recommendStore.sliderList.length === 0) {
      recommendStore.requestSlider()
    }
  }

  render () {
    const { recommendStore } = this.props.appStore
    const { sliderList } = recommendStore

    return (
      <div className="app-recommend">
      {
        sliderList.length && 
        <div className="slider-wrapper">
          <Slider>
            {
              sliderList.map(slider => (
                <div key={slider.id} className="slider-item">
                  <a href={slider.linkUrl}>
                    <img src={slider.picUrl} alt=""/>
                  </a>
                </div>
              ))
            }
          </Slider>
        </div>
      }
      </div>
    )
  }
}

export default Recommend
