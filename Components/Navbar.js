import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleDrawer } from '../Redux/Actions/Utils';

import { Menu } from 'antd';

import { Link } from 'react-router-dom';

import '../scss/Components/Navbar.scss';

const Navbar = props => {
  const logoIcon = <i className='fas fa-cloud-sun' />;
  const favoritesIcon = <i className='fas fa-star' />;

  return (
    <Menu
      mode='horizontal'
      className={`${props.theme === 'dark' ? ' navbar-theme__dark' : ''}`}
    >
      <Menu.Item
        key='drawer__button'
        className='navbar-hamburger__wrapper'
        onClick={props.toggleDrawer}
      >
        <i className='fas fa-bars' id='navbar-hamburger__button' />
      </Menu.Item>
      <Menu.Item key='navbar__button' icon={logoIcon}>
        <Link to='/'>Home</Link>
      </Menu.Item>

      <Menu.Item key='navbar__favorites' icon={favoritesIcon}>
        <Link to='/favorites'>Favorites</Link>
      </Menu.Item>
    </Menu>
  );
};

Navbar.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light'])
};

export default React.memo(connect(null, { toggleDrawer })(Navbar));
