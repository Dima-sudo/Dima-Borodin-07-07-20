import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

// Components
import Navbar from '../Components/Navbar';

// Pages
import Home from '../Pages/Home';
// import Test from '../Components/AutoComplete';

// Libraries & Misc.
import '../scss/App.scss';

function App() {
  return (
    <>
      <div id='app-container'>
        <BrowserRouter>
          <Navbar />

          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/search' component={Home} />
            <Route exact path='/favorites' component={Home} />
            {/* <Route exact path='/test-page' component={Test} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
