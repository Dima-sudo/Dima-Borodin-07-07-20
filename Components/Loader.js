import React from 'react';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import '../scss/Components/Loader.scss';

const Loader = () => {
  const customLoader = <LoadingOutlined id='spinner-svg' spin />;

  return (
    <div className='app-loader__icon'>
      <Spin indicator={customLoader} />
    </div>
  );
};

export default Loader;
