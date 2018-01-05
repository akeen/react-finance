import Home from './index'
import Login from './1-Login'
import Favorite from './2-Favorite'
import History from './3-History'
import About from './4-About'
import Feedback from './5-Feedback'

export default [
  {
    path: '/me',
    component: Home,
  }, {
    path: '/login',
    component: Login,
  }, {
    path: '/me/favorite',
    component: Favorite,
  }, {
    path: '/me/history',
    component: History,
  }, {
    path: '/me/about',
    component: About,
  }, {
    path: '/me/feedback',
    component: Feedback,
  },
]
