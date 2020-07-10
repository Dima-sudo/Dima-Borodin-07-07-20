import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'antd';

import '../scss/Components/Glass.scss';

const Glass = ({ children, className, theme }) => {
  return (
    <Card
      bordered={false}
      className={`glass-card__wrapper${className ? ' ' + className : ''}${
        theme === 'dark' ? ' glass-theme__dark' : ''
      }`}
    >
      {children}
    </Card>
  );
};

Glass.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light'])
};

export default Glass;
