import { GET_MY_SEARCH } from '@actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_MY_SEARCH:
      return [...(action.cacheSearchList.length > 0 && action.cacheSearchList)]
    default:
      return state
  }
}
