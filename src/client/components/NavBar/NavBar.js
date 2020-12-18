import React from 'react';
import { Link } from 'react-router-dom';

/* Import Less style */
import './NavBar.less';

const NavBar = () => (
  <Link to="/new" className="navbar__float-button">
    +
  </Link>
);

export default NavBar;
