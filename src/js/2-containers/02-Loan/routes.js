import Home from './index'
import Detail from './1-Detail'

export default [
  {
    path: '/loan',
    component: Home,
  }, {
    path: '/loan/:id',
    component: Detail,
  },
]
