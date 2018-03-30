import React from 'react'
import { NavLink } from 'react-router-dom'

import './style.styl'

const Tab = () => (
  <div className="app-tab">
    <NavLink to="/recommend" className="tab-item" activeClassName="active">
    <span className="tab-link">推荐</span>
    </NavLink>
    <NavLink to="/singer" className="tab-item" activeClassName="active">
      <span className="tab-link">歌手</span>
    </NavLink>
    <NavLink to="/rank" className="tab-item" activeClassName="active">
      <span className="tab-link">排行</span>
    </NavLink>
    <NavLink to="/search" className="tab-item" activeClassName="active">
      <span className="tab-link">搜索</span>
    </NavLink>
  </div>
)

export default Tab
