import React from 'react';

import { connect } from 'react-redux';
import {
  toggleDrawer,
  toggleCloudAnimation,
  toggleMode,
  toggleTheme
} from '../Redux/Actions/Utils';

import { Drawer, Switch, Menu } from 'antd';

import '../scss/Components/Drawer.scss';

const SideBar = props => {
  return (
    <Drawer
      title='Options'
      placement='left'
      closable={false}
      onClose={props.toggleDrawer}
      visible={props.visible}
    >
      <Menu>
        <li className='drawer-menu__item'>
          <h3>Degrees</h3>

          <Switch
            className='drawer-menu__switch'
            checkedChildren='C'
            unCheckedChildren='F'
            defaultChecked
            onChange={props.toggleMode}
          />
        </li>
        <li className='drawer-menu__item'>
          <h3>Clouds</h3>

          <Switch
            className='drawer-menu__switch'
            checkedChildren='On'
            unCheckedChildren='Off'
            defaultChecked
            onChange={props.toggleCloudAnimation}
          />
        </li>
        <li className='drawer-menu__item'>
          <h3>Theme</h3>

          <Switch
            className='drawer-menu__switch'
            checkedChildren='Light'
            unCheckedChildren='Dark'
            defaultChecked
            onChange={props.toggleTheme}
          />
        </li>
      </Menu>
    </Drawer>
  );
};

const mapStateToProps = store => {
  return {
    visible: store.Utils.drawerVisible
  };
};

export default React.memo(
  connect(mapStateToProps, {
    toggleDrawer,
    toggleCloudAnimation,
    toggleMode,
    toggleTheme
  })(SideBar)
);
