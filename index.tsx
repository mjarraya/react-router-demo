import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { RouterProvider, createBrowserRouter, matchRoutes } from 'react-router-dom'
import { routes } from './routes'

// Determine if any of the initial routes are lazy
const lazyMatches = matchRoutes(
  routes,
  window.location
)?.filter((m) => m.route.lazy);

// see https://github.com/remix-run/react-router/issues/10918
// Load the lazy matches and update the routes before creating your router
// so we can hydrate the SSR-rendered content synchronously
if (lazyMatches && lazyMatches?.length > 0) {
  Promise.all(lazyMatches.map(async (m) => {
    const routeModule = await m.route.lazy?.()
    Object.assign(m.route, {
      ...routeModule,
      lazy: undefined
    })
  })).then(() => {
    ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement,
      <React.StrictMode>
        <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>
      </React.StrictMode>
    )
  })
} else {
  ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement,
    <React.StrictMode>
      <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>
    </React.StrictMode>
  )
}