import { CARDS_HOME } from '@actions'

const [REQUEST, SUCCESS, FAIL] = CARDS_HOME

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
        ...action.response,
        isFetching: false,
      }
    case FAIL:
      return {
        ...state,
        err: action.err,
        isFetching: false,
      }
    default:
      return state
  }
}

