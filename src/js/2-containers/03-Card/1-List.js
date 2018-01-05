import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SwitchSelect, ScrollLoad, ProductList } from '@components'
import { searchToObj, setTitle } from '@utils'
@connect(state => ({
  cardsFilter: state.cardsFilter,
}))
export default class extends Component {
  state = {
    dataParam: null,
    currentTitle: null,
    selectList: null,
  }

  componentWillMount() {
    setTitle('信用卡-列表')
  }

  componentDidMount() {
    const { cardsFilter } = this.props
    if (cardsFilter.currentTitle) {
      this.changeData(cardsFilter)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.cardsFilter.currentTitle && nextProps.cardsFilter.currentTitle) {
      this.changeData(nextProps.cardsFilter)
    }
  }
  onSelect = (param) => {
    const dataParam = {}
    param.forEach((item) => {
      const k = item.key
      const v = item.id
      dataParam[k] = v
    })
    this.setState(() => ({ dataParam }))
  }
  // 更改顶部选项的逻辑
  changeData = (cardsFilter) => {
    const searchObj = searchToObj()
    const { currentTitle, selectList } = cardsFilter
    if (searchObj) {
      const newSearchObj = {}
      const newTitle = []
      const dataParam = {}
      currentTitle.forEach((item) => {
        if (searchObj[item.key] === undefined) {
          newSearchObj[item.key] = item.id
        } else {
          newSearchObj[item.key] = +searchObj[item.key]
        }
      })
      selectList.forEach((item) => {
        const val = newSearchObj[item.key]
        const obj = item.list.find(item => item.id === val) ? item.list.find(item => item.id === val) : item.list[0]
        newTitle.push({ key: item.key, ...obj })
      })
      newTitle.forEach((item) => {
        const k = item.key
        const v = item.id
        dataParam[k] = v
      })
      this.setState(() => ({
        currentTitle: newTitle,
        selectList,
        dataParam,
      }))
    } else {
      this.setState(() => ({
        currentTitle,
        selectList,
        dataParam: {},
      }))
    }
  }
  render() {
    const { dataParam, currentTitle, selectList } = this.state
    return (
      <div className="flex column h-100">
        <SwitchSelect
          currentTitle={currentTitle}
          selectList={selectList}
          onSelect={this.onSelect}
        />
        {
          dataParam ?
            <ScrollLoad
              className="equal"
              listClass="border-bottom"
              dataPath="cards_list"
              dataParam={dataParam}
              dataName="list"
              renderRow={item => <ProductList {...item} />}
              noDataIco={{ ico: 'i-search', text1: '抱歉，暂无数据', text2: '已经到底了' }}
            >
              <div className="h20 bg-body" />
              <div className="card-list-bg" />
              <div className="h20 bg-body" />
            </ScrollLoad> :
            <div className="equal" />
        }
      </div>
    )
  }
}
