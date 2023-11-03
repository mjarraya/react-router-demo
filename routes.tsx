import React, { Suspense } from 'react'
import { Layout } from './Layout'
import { Home } from './Home'
import { Items, itemRoutes } from './Items'
import { Error404 } from './Error404'
import { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [{
  path: '/',
  element: <Layout />,
  errorElement: <Error404 />,
  children: [{
    index: true,
    element: <Home />
  },
  {
    path: '/items/*',
    children: itemRoutes,
  },
  {
    path: '/profile',
    lazy: async () => {
      const { Profile } = await import('./Profile')

      return {
        element: <Profile />
      }
    }
  },
  {
    path: '/conditional',
    element: Math.random() > 0.5 ? <Items /> : null
  }
  ]
}]

