import React from 'react'
import { Redirect } from 'react-router-dom'
import MainPage from '@/pages/MainPage'
import SummaryListPage from '@/pages/User/SummaryListPage'
import RandomPage from '@/pages/User/RandomPage'

const routerList = [
  {
    name: 'Main Page',
    component: MainPage,
    path: '/',
    routes: [
      {
        name: 'Users',
        path: '/users/summart',
        component: SummaryListPage
      },
      {
        name: 'Random Users',
        path: '/users/random',
        component: RandomPage
      },
      {
        path: '/*',
        component: () => <Redirect path='/*' to='/users/random' />
      }
    ]
  }
]

export default routerList
