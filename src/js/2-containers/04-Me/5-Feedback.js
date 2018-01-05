import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { TextareaItem, Toast } from 'antd-mobile'
import { Btn } from '@components'
import { http, cache, setTitle } from '@utils'

@connect(state => ({
  user: state.user,
}))

export default class extends Component {
  state = { disable: true }

  componentWillMount() {
    setTitle('意见反馈')
  }

  onChange = (v) => {
    const val = v.trim()
    this.setState(() => ({ disable: !val }))
  }

  onSubmit = () => {
    const { history } = this.props
    const { disable } = this.state
    const content = this.textarea.state.value.trim()
    const token = cache.getItem('user_token')
    if (disable) return
    Toast.loading('提交中...')
    http.post('feedback', { content, token }).then((response) => {
      if (response.code === 200 && response.success) {
        Toast.success('您的意见我们已收到!', 2, () => {
          history.replace('/')
        })
      } else {
        Toast.fail(`抱歉，请求异常。${response.msg}`)
      }
    }).catch(() => { Toast.offline('抱歉，网络错误，请稍后再试。') })
  }
  render() {
    const { disable } = this.state
    const { user } = this.props
    if (!user.phone) return <Redirect to={{ pathname: '/login', state: { from: '/me/feedback' } }} />
    return (
      <div className="flex column h-100">
        <div className="plr20 pt15 pb30">
          <div className="r10 overflow-h">
            <TextareaItem
              ref={ele => this.textarea = ele}
              rows={5}
              count={100}
              onChange={this.onChange}
              placeholder="亲，请留下您的宝贵意见。"
            />
          </div>
        </div>
        <Btn
          ver
          btnClass={`r8 h72 mr25 ml25 ${!disable ? 'bg-main' : 'bg-ccc'}`}
          con={<span className="font30 c-white">提交</span>}
          onClick={this.onSubmit}
        />
      </div>
    )
  }
}
