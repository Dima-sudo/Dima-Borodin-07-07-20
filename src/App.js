import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import Navbar from '../Components/Navbar';
import AnimatedClouds from '../Components/AnimatedClouds';
import Drawer from '../Components/Drawer';

// Pages
import Home from '../Pages/Home';
import Favorites from '../Pages/Favorites';
import Error from '../Pages/Error';

// Libraries & Misc.
import '../scss/App.scss';

function App(props) {
  const theme = props.theme === 'dark' ? 'dark' : 'light';
  const { hasValidApiKey } = props;
  return (
    <main id='app-container'>
      {hasValidApiKey ? (
        <BrowserRouter>
          <Navbar theme={theme} />

          <AnimatedClouds visible={true} />

          <Drawer />

          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/favorites' component={Favorites} />
          </Switch>
        </BrowserRouter>
      ) : (
        <Error />
      )}
    </main>
  );
}

const mapStateToProps = store => {
  return {
    theme: store.Utils.theme,
    hasValidApiKey: store.Utils.hasValidApiKey
  };
};

export default React.memo(connect(mapStateToProps)(App));
