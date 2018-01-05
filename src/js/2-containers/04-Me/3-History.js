import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollLoad, MeProductList } from '@components'
import { cache, setTitle } from '@utils'

@connect(state => ({
  user: state.user,
}))

export default class extends Component {
  state = {
    dataParam: null,
  }
  componentWillMount() {
    setTitle('我的浏览记录')
  }
  componentDidMount() {
    if (this.props.user.phone) {
      this.setParam()
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.user.phone && nextProps.user.phone) {
      this.setParam()
    }
  }
  setParam = () => {
    const token = cache.getItem('user_token')
    this.setState(() => ({ dataParam: { token } }))
  }
  render() {
    const {
      dataParam,
    } = this.state
    return (
      <div className="flex column h-100">
        {
          dataParam &&
          <ScrollLoad
            className="equal"
            listClass="border-bottom"
            dataPath="track"
            dataParam={dataParam}
            dataName="track"
            renderRow={item => <MeProductList {...item} />}
            noDataIco={{ ico: 'i-search', text1: '您尚未留下浏览足迹', text2: '已经到底了' }}
          />
        }
      </div>
    )
  }
}
