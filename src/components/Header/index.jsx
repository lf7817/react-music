import React from 'react'
import { Link } from 'react-router-dom'
import './style.styl'

const Header = () => (
  <div className="app-header">
    <div className="icon"></div>
    <h1 className="text">火鸡音乐</h1>
    <Link to="/mine" className="mine">
      <i className="icon-mine"></i>
    </Link>
  </div>
)

export default Header
