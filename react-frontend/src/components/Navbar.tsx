import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Navbar: React.FC = () => {
  // Helper function to determine the class name based on isActive and isPending props
  const getNavLinkClassName = ({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) => {
    return isPending ? 'pending' : isActive ? 'active' : '';
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={getNavLinkClassName}>
              Fines
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/subjects"
              className={getNavLinkClassName}>
              Subjects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/courthouses"
              className={getNavLinkClassName}>
              Courthouses
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
