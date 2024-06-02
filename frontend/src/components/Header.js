import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ onSearch }) => {
  const location = useLocation();

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  // Check if the current location is the UserDetails page
  const isUserDetailsPage = location.pathname.startsWith('/user/');

  return (
    // Render the header only if it's not the UserDetails page
    !isUserDetailsPage && (
      <div className="header">
        <h1>User Dashboard</h1>
        <input type="text" onChange={handleChange} placeholder="Search Users" />
        <Link to="/new" className="button">New User</Link>
      </div>
    )
  );
};

export default Header;
