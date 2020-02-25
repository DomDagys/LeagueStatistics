import React from 'react';
import {Link} from 'react-router-dom';

function NavigationBar() {
  return(
    <nav className="navbar navbar-dark bg-primary fixed-right">
      <a href="https://app.mobalytics.gg/summoner-search">Home</a>
      <a>Profile</a>
      <a href="https://en.wikipedia.org/wiki/React_(web_framework)">Ect</a>
    </nav>
  )
}

export default NavigationBar;
