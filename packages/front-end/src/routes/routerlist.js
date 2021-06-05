import React from 'react'
import { Redirect } from 'react-router-dom'
import MainPage from '@/pages/MainPage'
import UserList from '@/pages/User/SummaryList'
import TrendingUser from '@/pages/User/Trending'

const routerList = [
  {
    name: 'Main Page',
    component: MainPage,
    path: '/',
    routes: [
      {
        name: 'Users',
        path: '/users',
        component: UserList
      },
      {
        name: 'Random Users',
        path: '/users/trending',
        component: TrendingUser
      },
      {
        path: '/*',
        component: () => <Redirect path='/*' to='/users/trending' />
      }
    ]
  }
]

export default routerList
