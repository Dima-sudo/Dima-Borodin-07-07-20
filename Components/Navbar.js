import React from 'react';

import { Menu } from 'antd';

import { Link } from 'react-router-dom';

import '../scss/Components/Navbar.scss';

function Navbar() {
  const logoIcon = <i className='fas fa-cloud-sun' />;
  const searchIcon = <i className='fas fa-search' />;
  const favoritesIcon = <i className='fas fa-star' />;

  return (
    <Menu mode='horizontal'>
      <Menu.Item key='home-navbar__button' icon={logoIcon}>
        <Link to='/'>Home</Link>
      </Menu.Item>

      <Menu.Item key='home-navbar__search' icon={searchIcon}>
        <Link to='/search'>Search</Link>
      </Menu.Item>
      <Menu.Item key='home-navbar__favorites' icon={favoritesIcon}>
        <Link to='/favorites'>Favorites</Link>
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
