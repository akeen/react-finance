import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Nav, Btn, WrapLink, MultiColorIco } from '@components'
import { cache, setTitle } from '@utils'
import { getOut } from '@actions'

@connect(state => ({
  user: state.user,
}), { getOut })

export default class extends Component {
  state = {}
  componentWillMount() {
    setTitle('个人中心')
  }
  onLogout = () => {
    const { getOut } = this.props
    cache.removeItem('user_token')
    getOut()
  }
  render() {
    const {
      user,
    } = this.props
    const list = [
      // { ico: 'i-me c-main', text: ['个人资料', '修改完善'], path: '/me' },
      { ico: 'i-my-like c-me-star', text: ['我的收藏', ''], path: '/me/favorite' },
      { ico: 'i-browsing-history c-second', text: ['浏览记录', ''], path: '/me/history' },
      // { ico: 'i-invite c-me-invite', text: ['邀请好友', ''], path: '/me' },
      { ico: 'i-about c-me-about', text: ['关于我们', ''], path: '/me/about' },
    ]
    if (!user.phone) {
      return <Redirect to={{ pathname: '/login', state: { from: '/me' } }} />
    }
    return (
      <div className="flex column h-100">
        <div className="equal bg-white">
          <div
            style={{ height: '2.46rem' }}
            className="relative flex column jc-center ai-center bg-main"
          >
            {/* <Btn
              style={{ position: 'absolute', top: '0.2rem', right: '0.35rem' }}
              path="/me/set"
              icoClass="i-set font38 c-white"
            /> */}
            <div className="w84 h84 circle overflow-h log-bg">
              <img src={user.avatar ? user.avatar : 'https://public.duduapp.net/finance/static/img/login.gif'} className="h-100" alt="" />
            </div>
            <div className="font28 bold c-white lh100 pt30">{user.name ? user.name : user.phone}</div>
          </div>

          <div className="pt10 pl25">
            {
              list.map(item => (
                <WrapLink
                  key={uuid.v4()}
                  className="h92 flex ai-center jc-between border-bottom pr25"
                  path={item.path}
                >
                  <div className="flex ai-center">
                    <i className={`${item.ico} font30 mr10`} />
                    <span className="font28 c333">{item.text[0]}</span>
                  </div>
                  <div className="flex ai-center">
                    <span className="font24 c999">{item.text[1]}</span>
                    <i className="i-right font18 ml10" />
                  </div>
                </WrapLink>
              ))
            }
            <WrapLink
              className="h92 flex ai-center jc-between border-bottom pr25"
              path="/me/feedback"
            >
              <div className="flex ai-center">
                <MultiColorIco ico="i-feedback font30 mr10" num={3} />
                <span className="font28 c333">意见反馈</span>
              </div>
              <div className="flex ai-center">
                <i className="i-right font18 ml10" />
              </div>
            </WrapLink>
          </div>

          <div className="h20 bg-body" />
          <div className="pl25">
            <Btn
              ver
              btnClass="border-bottom-one h82"
              con={<span className="font24 c-main">退出登录</span>}
              onClick={this.onLogout}
            />
          </div>
        </div>
        <Nav />
      </div>
    )
  }
}
