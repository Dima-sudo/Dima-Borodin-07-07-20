import React from 'react';

import { connect } from 'react-redux';

import '../scss/Components/AnimatedClouds.scss';

const AnimatedClouds = ({ visible }) => {
  return visible ? (
    <div
      id='clouds-background__wrapper'
      aria-describedby='clouds-background-decoration-wrapper'
    >
      <div
        className='cloud-instance__1'
        aria-labelledby='cloud-decoration-animated-1'
      >
        <div className='cloud' />
      </div>

      <div
        className='cloud-instance__2'
        aria-labelledby='cloud-decoration-animated-2'
      >
        <div className='cloud' />
      </div>

      <div
        className='cloud-instance__3'
        aria-labelledby='cloud-decoration-animated-3'
      >
        <div className='cloud' />
      </div>

      <br />

      <div
        className='cloud-instance__4'
        aria-labelledby='cloud-decoration-animated-4'
      >
        <div className='cloud' />
      </div>

      <br />

      <div
        className='cloud-instance__5'
        aria-labelledby='cloud-decoration-animated-5'
      >
        <div className='cloud' />
      </div>

      <br />
      <br />

      <div
        className='cloud-instance__6'
        aria-labelledby='cloud-decoration-animated-6'
      >
        <div className='cloud' />
      </div>
    </div>
  ) : null;
};

const mapStateToProps = store => {
  return {
    visible: store.Utils.cloudAnimationVisible
  };
};

export default React.memo(connect(mapStateToProps)(AnimatedClouds));
