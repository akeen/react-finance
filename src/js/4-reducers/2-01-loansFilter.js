import { LOANS_FILTER } from '@actions'
import { addDefault } from '@utils'

const [REQUEST, SUCCESS, FAIL] = LOANS_FILTER
const TITLE = [{ title: '综合排序', key: 'sort' }, { title: '全部类型', key: 'type' }, { title: '不限额度', key: 'limit' }]

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
