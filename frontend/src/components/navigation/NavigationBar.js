import React from 'react';
import './NavigationBarStyle.css';
import {Link} from 'react-router-dom';

function NavigationBar() {
  return(
    <div id="mySidenav" class="sidenav">
      <div>
        <h1>Menu</h1>
        <a href="https://app.mobalytics.gg/summoner-search">Home</a>
        <a href="https://www.facebook.com">Profile</a>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/">Root</Link>
      </div>
    </div>
  )
}

export default NavigationBar;
