import { CARDS_FILTER } from '@actions'
import { addDefault } from '@utils'

const [REQUEST, SUCCESS, FAIL] = CARDS_FILTER
const TITLE = [{ title: '全部银行', key: 'bank' }, { title: '所有卡型', key: 'use' }, { title: '不限等级', key: 'level' }]

export default (state = { isFetching: false }, action) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case SUCCESS:
      return {
        ...state,
        currentTitle: TITLE,
        selectList: addDefault(TITLE, action.response.selectList),
        isFetching: false,
      }
    case FAIL:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}
