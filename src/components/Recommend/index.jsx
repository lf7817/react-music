import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
// import LazyLoad from 'react-lazy-load'
import Slider from '@/base/Slider'
import Scroll from '@/base/Scroll'
import Loading from '@/base/Loading'

import './style.styl'

@inject('appStore')
@observer
class Recommend extends Component {

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

  onScrollHandler = pos => {
    this.startPos = pos
  }

  componentDidMount () {
    this.getSlider()
    setTimeout(() => {
      this.getDiscList()
    }, 300)
  }

  componentWillUnmount () {
    const { recommendStore } = this.props.appStore
    if (this.startPos) {
      recommendStore.setScrollPos(this.startPos)
    }
  }

  render () {
    const { recommendStore } = this.props.appStore
    const { sliderList, startIndex, setSliderIndex, discList, pos } = recommendStore

    return (
      <div className="app-recommend">
        <Scroll 
          startPos={pos}
          probeType={3}
          className="recommend-content" 
          ref={scroll => this.scroll = scroll}
          onScroll={this.onScrollHandler}>
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
                      <div key={slider.id}>
                        <a href={slider.linkUrl}>
                          <img src={slider.picUrl} alt="" onLoad={this.imageOnload}/>
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
                        {/* <LazyLoad height={60} debounce={false} throttle={50}> */}
                        <img src={disc.imgurl} alt="" width="60" height="60"/>
                        {/* </LazyLoad> */}
                      </div>
                      <div className="text">
                        <h2 className="name">{disc.creator.name}</h2>
                        <p className="desc">{disc.dissname}</p>
                      </div>
                    </li>
                  )
                ) : <Loading title="正在载入..."/>
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
