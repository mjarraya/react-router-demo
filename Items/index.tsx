import React from 'react'
import { Link, RouteObject, useParams } from 'react-router-dom'

export const Items = (): JSX.Element => {
  return <div><h1>Items</h1>
    <Link to="new">New</Link>

    {/* Link `to` can be relative or absolute */}
    <Link to="abc123">Foo</Link>
    <Link to="/items/def456">Bar</Link>
  </div>
}

const Item = (): JSX.Element => {
  const { id } = useParams()
  return <div>
    <h1>Item id #{id}</h1>
  </div>
}

const NewItem = (): JSX.Element => {
  return <div>
    <h1>New Item</h1>
    {/* some form */}
  </div>
}

// subrouter for '/items'
export const itemRoutes: RouteObject[] = [{
  index: true,
  element: <Items />
},
{
  // path: '/items/new' won't work as nested routes are always relative to their parent route
  path: 'new',
  element: <NewItem />
},
{
  path: ':id',
  element: <Item />
},
]