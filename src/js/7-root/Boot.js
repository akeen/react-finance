import React from 'react'
// import { isIOS } from '../utils/index'
// import { setConfig } from '../utils/wxapi'
// import http from '../utils/http'

export default class extends React.Component {
  componentWillMount() {
    // if (isIOS()) {
    //   http.get('/wxconfig', { url: encodeURIComponent(window.location.href) }).then((data) => {
    //     if (data.wxconfig) setConfig(data.wxconfig)
    //   })
    // }
  }
  render() {
    return this.props.children
  }
}
