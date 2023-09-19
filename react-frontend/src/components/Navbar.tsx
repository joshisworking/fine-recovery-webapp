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
          {/* "Archive, inbox Icon" by Afrian E. Prasetyo from Icon-icons.com is licensed under CC BY 4.0. To view a copy of the license, visit https://creativecommons.org/licenses/by/4.0 */}
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
                to="/courthouses"
                className={getNavLinkClassName}>
                Courthouses
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
