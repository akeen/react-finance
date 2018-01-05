import React from 'react'
import { NavLink } from 'react-router-dom'

export default () => (
  <div style={{ position: 'relative', zIndex: 5 }} className="flex h110 ai-stretch bg-white border-top-shadow">
    <NavLink
      exact
      to="/"
      activeClassName="c-main"
      className="equal flex column jc-center ai-center c-ccc"
    >
      <i className="i-home font44 mb10" />
      <span className="font26 lh100">首页</span>
    </NavLink>
    <NavLink
      to="/loan"
      activeClassName="c-main"
      className="equal flex column jc-center ai-center c-ccc"
    >
      <i className="i-loan font44 mb10" />
      <span className="font26 lh100">贷款</span>
    </NavLink>
    <NavLink
      to="/card"
      activeClassName="c-main"
      className="equal flex column jc-center ai-center c-ccc"
    >
      <i className="i-card font44 mb10" />
      <span className="font26 lh100">信用卡</span>
    </NavLink>
    <NavLink
      to="/me"
      activeClassName="c-main"
      className="equal flex column jc-center ai-center c-ccc"
    >
      <i className="i-user font44 mb10" />
      <span className="font26 lh100">我的</span>
    </NavLink>
  </div>
)
