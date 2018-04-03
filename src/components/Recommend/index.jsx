import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Slider from '@/base/Slider'
import Scroll from '@/base/Scroll'

import './style.styl'

@inject('appStore')
@observer
class Recommend extends Component {
  componentDidMount () {
    this.getSlider()
    this.getDiscList()
  }

  getSlider () {
    const { recommendStore } = this.props.appStore
    if (recommendStore.sliderList.length === 0) {
      recommendStore.requestSlider()
    }
  }

  getDiscList () {
    const { recommendStore } = this.props.appStore
    if (recommendStore.discList.length === 0) {
      recommendStore.requestDiscList()
    }
  }

  imageOnload = () => {
    if (!this.checkLoadImage) {
      this.checkLoadImage = true
      this.scroll.refresh()
    }
  }

  onScrollEndHandler = pos => {
    console.log(pos)
  }

  onScrollHander = pos => {
    console.log(pos)
  }

  render () {
    const { recommendStore } = this.props.appStore
    const { sliderList, startIndex, setSliderIndex, discList } = recommendStore

    return (
      <div className="app-recommend">
        <Scroll 
          probeType={3}
          className="recommend-content" 
          ref={scroll => this.scroll = scroll}
          // onScrollEnd={this.onScrollEndHandler}
          onScroll={this.onScrollHander}
          >
          <div>
            {
              sliderList.length ? 
              <div className="slider-wrapper">
                <Slider 
                  loop
                  autoPlay
                  interval={4000}
                  startIndex={startIndex}
                  setSliderIndex={setSliderIndex}>
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
              </div> : null
            }
            <div className="recommend-list">
              <h1 className="list-title">热门歌单推荐</h1>
              <ul>
              {
                discList.length ? 
                  discList.map(disc => (
                    <li key={disc.dissid} className="item">
                      <div className="icon">
                        <img src={disc.imgurl} alt="" width="60" height="60" onLoad={this.imageOnload}/>
                      </div>
                      <div className="text">
                        <h2 className="name">{disc.creator.name}</h2>
                        <p className="desc">{disc.dissname}</p>
                      </div>
                    </li>
                  )
                ) : null
              }
              </ul>
            </div>
          </div>
        </Scroll>
      </div>
    )
  }
}

export default Recommend
