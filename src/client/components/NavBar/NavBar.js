import React from 'react';
import { Link } from 'react-router-dom';

/* Import Less style */
import './NavBar.less';

const NavBar = () => (
  <div className="navbar__float-button">
    <Link to="/new">
      +
    </Link>
  </div>
);

export default NavBar;
