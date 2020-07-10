import React from 'react';
import { connect } from 'react-redux';

import Glass from '../Components/Glass';

import '../scss/Pages/Error.scss';
import Icons from '../Resources/Objects/Icons';

function Error(props) {
  const theme = props.theme === 'dark' ? 'dark' : 'light';
  const { Error } = Icons;

  return (
    <main id='error-page__wrapper' className='container slide-in'>
      <Glass theme={theme} className='error-section__wrapper'>
        <h1 className='error-heading__text'>Whoops! Sorry about that.</h1>
        <p className='error-description__text'>
          Thanks for using the app! It looks like there was a server-side error
          or perhaps you've reached the daily limit of the free API key. Feel
          free to reach out and I'll provide a new one.
        </p>
        <span className='error-image__wrapper'>
          <img src={Error} className='error-image' alt='error-image' />
        </span>
      </Glass>
    </main>
  );
}

const mapStateToProps = store => {
  return {
    theme: store.Utils.theme
  };
};

export default React.memo(connect(mapStateToProps)(Error));
