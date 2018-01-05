// import React from 'react'
import Home from './index'
import CardList from './1-List'
import Detail from './2-Detail'

// router 配置参考 http://www.jianshu.com/p/e3adc9b5f75c

export default [
  {
    path: '/card',
    component: Home,
  }, {
    path: '/card/list',
    component: CardList,
  }, {
    path: '/card/:id',
    component: Detail,
  },
]


// {
//   path: '/card/:id',
//   render: () => <h1>see you</h1>,
// }
