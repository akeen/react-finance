// import {
//   delay,
// } from 'redux-saga'

import {
  take,
  put,
} from 'redux-saga/effects'

import {
  LOANS_FILTER,
  getLoansFilter,
} from '@actions'
// 去掉 .js 文件名字试试啊

// function* incrementAsync() {
//   for (let i = 0; i < 3; i += 1) {
//     yield call(delay, 1000)
//     yield put({ type: COUNT_DOWN })
//   }
//   yield put({ type: INCREMENT_COUNTER })
//   yield put({ type: ASYNC_OVER })
// }

function* g() {
  yield put(getLoansFilter())
}

export default function* watchGetLoansFilter() {
  yield take(LOANS_FILTER, g)
}
