import React from "react"
import { NavLink, Outlet } from 'react-router-dom'

export const Layout = (): JSX.Element => {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/items">Items</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};