import React, { Component } from 'react'
import { setTitle } from '@utils'

export default class extends Component {
  state = { about: null }
  componentWillMount() {
    setTitle('关于我们')
  }
  render() {
    const { about } = this.state
    return (
      <div className="flex column h-100">
        <div className="plr25 ptb30 bg-white">
          {about || '嘟嘟钱包是一家集贷款/信用卡办理平台。。。。。嘟嘟钱包是一家集贷款/信用卡办理平台。。。。。'}
        </div>
      </div>
    )
  }
}
