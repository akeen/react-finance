import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import createHistory from 'history/createBrowserHistory'

// 'routerMiddleware' the new way of storing route change with redux middleware since rrv4
// Build the middleware for intercepting and dispatching navigation actions
import { routerMiddleware } from 'react-router-redux'
import logger from 'redux-logger'
import apiMiddleware from '../8-middleware/api'
import routerChangeMiddleware from '../8-middleware/router'
import rootReducers from '../4-reducers'

export const history = createHistory()
const reactRouterMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line
const nextRootReducer = require('../4-reducers')

// 产品模式
function configureStorePro(initialState) {
  const middlewares = [sagaMiddleware, apiMiddleware, routerChangeMiddleware, reactRouterMiddleware]
  const store = createStore(
    rootReducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  )
  store.runSaga = sagaMiddleware.run
  // END 作用 https://github.com/redux-saga/redux-saga/issues/255
  store.close = () => store.dispatch(END)
  return store
}

// 开发模式
function configureStoreDev(initialState) {
  const middlewares = [
    sagaMiddleware, apiMiddleware, routerChangeMiddleware, reactRouterMiddleware, logger,
  ]
  const store = createStore(
    rootReducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  )
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../4-reducers', () => {
      store.replaceReducer(nextRootReducer)
    })
  }
  store.runSaga = sagaMiddleware.run
  // END 作用 https://github.com/redux-saga/redux-saga/issues/255
  store.close = () => store.dispatch(END)
  return store
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStorePro : configureStoreDev

export default configureStore
