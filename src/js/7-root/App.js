import React from 'react'
import { connect } from 'react-redux'
// import getUser from '../actions/user'
import {
  getHome,
  getHotSearch,
  getMySearch,
  getLoansFilter,
  getCardsFilter,
  getCardsHome,
  getUser,
} from '@actions'
import { cache } from '@utils'
// import { Loading } from '../components'
@connect(null, {
  getHome,
  getHotSearch,
  getMySearch,
  getLoansFilter,
  getCardsHome,
  getCardsFilter,
  getUser,
})
export default class extends React.Component {
  componentWillMount() {
    const {
      getHome,
      getHotSearch,
      getMySearch,
      getLoansFilter,
      getCardsHome,
      getCardsFilter,
      getUser,
    } = this.props
    const userToken = cache.getItem('user_token')
    let mySearch

    if (cache.getItem('my_search')) {
      mySearch = cache.getItem('my_search')
    } else {
      cache.setItem('my_search', [])
      mySearch = []
    }

    getHome()
    getHotSearch()
    getMySearch(mySearch)
    getLoansFilter()
    getCardsFilter()
    getCardsHome()
    if (userToken) {
      getUser(userToken)
    }
  }
  render() {
    return this.props.children
  }
}
