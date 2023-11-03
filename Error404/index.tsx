import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export const Error404 = (): JSX.Element => {
  const error = useRouteError() as Error

  return <div>
    <h1>Oops!</h1>
    <p>Sorry, an unexpected error has occurred.</p>
    <p>
      <i>{isRouteErrorResponse(error) && error.statusText || error.message}</i>
    </p>
  </div>
}