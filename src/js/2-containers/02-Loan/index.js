import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, SwitchSelect, ScrollLoad, ProductList } from '@components'
import { searchToObj, imgUrl, setTitle } from '@utils'

@connect(state => ({
  loansFilter: state.loansFilter,
}))

export default class extends Component {
  state = {
    banner: null,
    dataParam: null,
    currentTitle: null,
    selectList: null,
  }

  componentWillMount() {
    setTitle('贷款-列表')
  }

  componentDidMount() {
    const { loansFilter } = this.props
    if (loansFilter.currentTitle) {
      this.changeData(loansFilter)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.loansFilter.currentTitle && nextProps.loansFilter.currentTitle) {
      this.changeData(nextProps.loansFilter)
    }
  }

  onSelect = (param) => {
    const dataParam = {}
    param.forEach((item) => {
      const k = item.key
      const v = item.id
      dataParam[k] = v
    })
    this.setState(() => ({ dataParam, banner: param[1].banner }))
  }

  // 更改顶部选项的逻辑
  changeData = (loansFilter) => {
    const searchObj = searchToObj()
    const { currentTitle, selectList } = loansFilter
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
        banner: dataParam.type !== undefined ? selectList[1].list[dataParam.type].banner : '',
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
    const {
      dataParam, currentTitle, selectList, banner,
    } = this.state
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
              listClass="mb20"
              dataPath="loans"
              dataParam={dataParam}
              dataName="list"
              renderRow={item => <ProductList {...item} openHot />}
              noDataIco={{ ico: 'i-search', text1: '抱歉，暂无数据', text2: '已经到底了' }}
            >
              {
                banner &&
                <div className="plr25 pt20">
                  <div
                    style={{
                      height: '21.333vw',
                      maxHeight: '2.1333rem',
                      borderRadius: '0.08rem 0.08rem 0 0',
                    }}
                    className="overflow-h log-bg"
                  >
                    <img src={imgUrl(banner)} className="h-100" alt="" />
                  </div>
                </div>
              }
            </ScrollLoad> :
            <div className="equal" />
        }
        <Nav />
      </div>
    )
  }
}
