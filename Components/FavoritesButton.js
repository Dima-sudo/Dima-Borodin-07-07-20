import React from 'react';
import PropTypes from 'prop-types';

import { Button, Tooltip } from 'antd';

import '../scss/Components/FavoritesButton.scss';

const FavoritesButton = ({ onClick, type, theme }) => {
  const heartIcon = <i className='fas fa-heart' />;
  const brokenHeartIcon = <i className='fas fa-heart-broken' />;

  return type === 'primary' ? (
    <Tooltip title='Add to favorites? :)'>
      <Button
        type='primary'
        shape='circle'
        icon={heartIcon}
        className={`favorites-button${
          theme === 'dark' ? ' favorites-button__dark' : ''
        }`}
        onClick={onClick}
      />
    </Tooltip>
  ) : (
    <Tooltip title='Are you sure? :('>
      <Button
        type='danger'
        shape='circle'
        icon={brokenHeartIcon}
        className={`favorites-button${
          theme === 'dark' ? ' favorites-button__dark' : ''
        }`}
        onClick={onClick}
        danger
      />
    </Tooltip>
  );
};

FavoritesButton.propTypes = {
  type: PropTypes.oneOf(['primary', 'danger']).isRequired,
  onClick: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(['dark', 'light'])
};

export default FavoritesButton;
