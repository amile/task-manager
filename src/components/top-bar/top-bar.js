import React from 'react';
import { Link } from 'react-router-dom';

import './top-bar.sass';

const TopBar = () => {
  return (
    <div className="top-bar">
      <Link to="/">
        <div className="logo top-bar__logo">Инфокомпас</div>
      </Link>
    </div>
  );
};

export default TopBar;
