import React from 'react'
import pic from './loading.gif'
import './style.styl'

const Loading = ({title}) => (
  <div className="loading">
    <img src={pic} alt="" width="24" height="24"/>
    <p className="desc">{title}</p>
  </div>
)

export default Loading
