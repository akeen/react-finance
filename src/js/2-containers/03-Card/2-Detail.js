import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Toast } from 'antd-mobile'
import { DetailFoot } from '@components'
import { http, cache, imgUrl, setTitle } from '@utils'

@connect(state => ({
  user: state.user,
}))

export default class extends Component {
  state = {
    favorited: false,
    detail: null,
  }

  componentDidMount() {
    const { match, history } = this.props
    const userToken = cache.getItem('user_token')
    Toast.loading('加载中')
    http.get(
      `card_detail/${match.params.id}`,
      { token: userToken },
    ).then((response) => {
      Toast.hide()
      if (response.code === 200 && response.success) {
        const { favorited, detail } = response.data
        setTitle(detail.name)
        this.setState(() => ({ favorited, detail }))
      } else {
        Toast.fail(`抱歉，请求出错。${response.msg}`, 3, () => {
          history.replace('/')
        })
      }
    }).catch((err) => {
      Toast.offline('抱歉，网络错误，请稍后再试')
      console.info(err)
    })
  }

  // 收藏
  onLike = () => {
    const { detail } = this.state
    const { user, history } = this.props
    const userToken = cache.getItem('user_token')
    if (user.phone && userToken) {
      Toast.loading('处理中')
      http.put(
        'toggling_collect',
        { type: 2, type_id: detail.id, token: userToken },
      ).then((response) => {
        Toast.hide()
        if (response.code === 200 && response.success) {
          this.setState(pre => ({ favorited: !pre.favorited }))
        } else {
          Toast.fail(`抱歉，请求出错。${response.msg}`)
        }
      }).catch((err) => {
        Toast.offline('抱歉，网络错误，请稍后再试！')
        console.info(err)
      })
    } else {
      Toast.info('当前操作需要登录哦，页面即将跳转', 2, () => {
        history.push('/login', { from: `/card/${detail.id}` })
      })
    }
  }

  // 申请
  onApply = () => {
    const { detail } = this.state
    const { user, history } = this.props
    const userToken = cache.getItem('user_token')
    if (user.phone && userToken) {
      Toast.loading('处理中')
      // 记录申请的接口
      http.post(
        `apply/2/${detail.id}`,
        { token: userToken },
      ).then(() => {
        Toast.hide()
        window.location.href = detail.external_links
      }).catch(() => { window.location.href = detail.external_links })
    } else {
      Toast.info('当前操作需要登录哦，页面即将跳转', 2, () => {
        history.push('/login', { from: `/card/${detail.id}` })
      })
    }
  }
  render() {
    const { favorited, detail } = this.state
    if (!detail) return null
    return (
      <div className="flex column h-100">
        <div className="equal overflow-y">
          <div
            style={{ height: '40vw', maxheight: '4rem' }}
            className="card-detail-bg bg-white flex jc-center ai-center"
          >
            <div className="card-detail-top log-bg">
              <img src={imgUrl(detail.images)} className="h-100" alt="" />
            </div>
          </div>

          <div className="plr20 ptb15 bg-white">
            <div className="font30 bold c333 lh120 mb10">{detail.name || '标题'}</div>
            <div className="font24 c999 lh120">{detail.description || '描述'}</div>
          </div>
          <div className="h20" />

          <div className="pt25 pb10 bg-white">
            <div className="card-title font30 bold c333 pl20 h36">基本信息</div>
          </div>
          <div className="plr25 pb15 bg-white">
            {
              detail.organization &&
              <div className="flex ptb15">
                <div className="w130 font28 c999 equal-no">发卡组织:</div>
                <div className="font28 c333">{detail.organization}</div>
              </div>
            }
            <div className="flex ptb15">
              <div className="w130 font28 c999 equal-no">币<span className="c-white">彩蛋</span>种:</div>
              <div className="font28 c333">{detail.currency || '人民币'}</div>
            </div>
            {
              detail.level &&
              <div className="flex ptb15">
                <div className="w130 font28 c999 equal-no">等<span className="c-white">彩蛋</span>级:</div>
                <div className="font28 c333">{detail.level}</div>
              </div>
            }
            {
              detail.free_of_interest_period &&
              <div className="flex ptb15">
                <div className="w130 font28 c999 equal-no">免&nbsp;&nbsp;息&nbsp;&nbsp;期:</div>
                <div className="font28 c333">{detail.free_of_interest_period}</div>
              </div>
            }
          </div>
          <div className="h20" />

          <div className="pt25 pb20 bg-white">
            <div className="card-title font30 bold c333 pl20 h36">优惠特权</div>
          </div>
          <div className="plr25 pb25 bg-white font28 c333">
            {
              detail.privilege ?
                <div className="lh150" dangerouslySetInnerHTML={{ __html: detail.privilege }} />
                : '即将来袭，敬请期待！'
            }
          </div>
          <div className="h20" />

          <div className="pt25 pb10 bg-white">
            <div className="card-title font30 bold c333 pl20 h36">费用信息</div>
          </div>
          <div className="plr25 pb15 bg-white">
            {
              detail.yearFee &&
              <div className="flex ptb15">
                <div className="w160 font28 c999 equal-no">年<span className="c-white">大彩蛋</span>费:</div>
                <div className="font28 c333">{detail.yearFee}</div>
              </div>
            }
            {
              detail.cash_withdrawal_ratio &&
              <div className="flex pt15 pb10">
                <div className="w160 font28 c999 equal-no">提<span className="c-white">大彩蛋</span>现:</div>
                <div className="font28 c333">{detail.cash_withdrawal_ratio}%</div>
              </div>
            }
            {
              detail.repayment_staging &&
              <div className="flex pt15 pb10">
                <div className="w160 font28 c999 equal-no lh150">还款及分期:</div>
                <div className="font28 c333 lh150">{detail.repayment_staging}</div>
              </div>
            }
            <div className="flex ptb15">
              <div className="w160 font28 c999 equal-no lh150">积&nbsp;分&nbsp;规&nbsp;则:</div>
              <div className="font28 c333 lh150">{detail.integral_rule || '近期推出'}</div>
            </div>
          </div>
          <div className="h20" />

        </div>
        <DetailFoot isFavorite={favorited} onLike={this.onLike} onApply={this.onApply} />
      </div>
    )
  }
}
