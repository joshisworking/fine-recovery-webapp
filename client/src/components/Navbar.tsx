import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Navbar: React.FC = () => {
  const [cookie] = useCookies(['frpToken']);

  // Helper function to determine the class name based on isActive and isPending props
  const getNavLinkClassName = ({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) => {
    return isPending
      ? 'nav-link pending'
      : isActive
      ? 'nav-link active'
      : 'nav-link';
  };

  return (
    <>
      <div className="header">
        <a
          href="/"
          className="logo-link">
          <svg className="logo">
            <use href="/sprites.svg#building_icon" />
          </svg>
        </a>
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink
                to="/fine"
                className={getNavLinkClassName}>
                Fines
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/subject"
                className={getNavLinkClassName}>
                Subjects
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/courthouse"
                className={getNavLinkClassName}>
                Courthouses
              </NavLink>
            </li>
          </ul>
        </nav>
        {cookie.frpToken ? (
          <div className="navbar-end">
            <NavLink
              to="/logout"
              className="nav-link-end">
              Logout
            </NavLink>
          </div>
        ) : (
          ''
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
