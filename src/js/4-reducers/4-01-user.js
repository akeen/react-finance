import { USER, LOGOUT } from '@actions'
import { cache } from '@utils'

const [REQUEST, SUCCESS, FAIL] = USER

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
        ...action.response.user,
        isFetching: false,
      }
    case FAIL:
      cache.removeItem('user_token')
      return {
        ...state,
        err: action.err,
        isFetching: false,
      }
    case LOGOUT:
      return {
        isFetching: false,
      }
    default:
      return state
  }
}
