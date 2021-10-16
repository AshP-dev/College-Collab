import React from "react";
import { Link } from "react-router-dom"; //used instead of a-href

export const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> College Collab
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/profiles'>Developers</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <a href='/login'>Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
