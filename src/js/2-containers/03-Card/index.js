import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, CardRecommend, Btn, WrapLink, ProductList } from '@components'
import { imgUrl, setTitle } from '@utils'

@connect(state => ({
  cardsHome: state.cardsHome,
}))

export default class extends Component {
  state = {}

  componentWillMount() {
    setTitle('信用卡-首页')
  }
  render() {
    const { cardsHome } = this.props
    return (
      <div className="flex column h-100">
        <div className="equal overflow-y">
          <div className="ptb25 bg-white">
            <div className="card-title font30 bold c333 pl20 h36">今日推荐</div>
          </div>
          {cardsHome.recommends && cardsHome.recommends.length > 2 && <CardRecommend list={cardsHome.recommends} />}
          <div className="h20" />
          <div className="pt25 pb30 pr25 bg-white flex space-between">
            <div className="card-title font30 bold c333 pl20 h36 equal">银行中心</div>
            <Btn
              btnClass="flex row-reverse"
              hor
              path="/card/list"
              icoClass="i-right c999 font20"
              con={<span className="font24 c999">全部</span>}
            />
          </div>
          <div className="flex bg-white">
            {
              cardsHome.banks && cardsHome.banks.length > 0 && cardsHome.banks.slice(0, 5).map(item => (
                <WrapLink
                  key={uuid.v4()}
                  style={{ width: '20%' }}
                  className="flex column jc-center ai-center pb30"
                  path={`/card/list?bank=${item.id}`}
                >
                  <div className="h66 w66 log-bg">
                    <img src={imgUrl(item.image)} className="h-100" alt="" />
                  </div>
                  <span className="font24 c333 lh100 mt15 text-overflow-1">{item.name}</span>
                </WrapLink>
              ))
            }
          </div>
          <div className="flex bg-white">
            {
              cardsHome.banks && cardsHome.banks.length > 4 && cardsHome.banks.slice(5, 9).map(item => (
                <WrapLink
                  key={uuid.v4()}
                  style={{ width: '20%' }}
                  className="flex column jc-center ai-center pb30"
                  path={`/card/list?bank=${item.id}`}
                >
                  <div className="h66 w66 log-bg">
                    <img src={imgUrl(item.image)} className="h-100" alt="" />
                  </div>
                  <span className="font24 c333 lh100 mt15 text-overflow-1">{item.name}</span>
                </WrapLink>
              ))
            }
          </div>
          <div className="h20" />
          <div className="pt25 pb5 bg-white flex space-between pr25">
            <div className="card-title font30 bold c333 pl20 h36 equal">热卡排行</div>
            <Btn
              btnClass="flex row-reverse"
              hor
              path="/card/list"
              icoClass="i-right c999 font20"
              con={<span className="font24 c999">全部</span>}
            />
          </div>
          {
            cardsHome.cards && cardsHome.cards.length > 0 && cardsHome.cards.slice(0, 3).map((item, index) => (
              <ProductList key={uuid.v4()} border={index !== cardsHome.cards.length - 1} {...item} />
            ))
          }
          <div className="h20" />
        </div>
        <Nav />
      </div>
    )
  }
}
