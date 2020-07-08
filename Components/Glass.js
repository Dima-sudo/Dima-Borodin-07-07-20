import React from 'react';

import { Card } from 'antd';

import '../scss/Components/Glass.scss';

function Glass({ children, className }) {
  return (
    <Card
      bordered={false}
      className={`glass-card__wrapper ${className ? className : ''}`}
    >
      {children}
    </Card>
  );
}

export default Glass;
