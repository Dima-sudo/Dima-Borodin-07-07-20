import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import {
  reset_Saved_Conditions,
  set_Current_City
} from '../Redux/Actions/Locations';
import { toggleLoading } from '../Redux/Actions/Utils';

import Glass from '../Components/Glass';
import WeatherCard from '../Components/WeatherCard';
import { Row, Col } from 'antd';

import '../scss/Pages/Favorites.scss';

function Favorites(props) {
  const theme = props.theme === 'dark' ? 'dark' : 'light';
  const history = useHistory();

  const getNewConditions = async city => {
    props.reset_Saved_Conditions();
    await props.set_Current_City(city);
    history.push('/');
  };

  return (
    <main id='favorites-page__wrapper' className='container'>
      <Glass theme={theme}>
        {props.Favorites.length === 0 ? (
          <h1 className='heading-text'>Favorites Empty</h1>
        ) : (
          <Row>
            {props.Favorites.map(city => (
              <Col
                xs={24}
                md={12}
                lg={8}
                className='grid-cell__wrapper'
                key={city.GeoPosition.Latitude}
              >
                <WeatherCard
                  countryId={city.Country.ID}
                  currentWeather={
                    city.TimeZone.GmtOffset >= 0
                      ? `GMT+${city.TimeZone.GmtOffset}`
                      : `GMT${city.TimeZone.GmtOffset}`
                  }
                  name={city.EnglishName}
                  id={city.Key}
                  withId
                  withAction
                  key={city.Key}
                  className='slide-in-side'
                  onClick={() => getNewConditions(city)}
                />
              </Col>
            ))}
          </Row>
        )}
      </Glass>
    </main>
  );
}

const mapStateToProps = store => {
  return {
    Favorites: store.Locations.Favorites,
    theme: store.Utils.theme
  };
};

export default React.memo(
  connect(mapStateToProps, {
    reset_Saved_Conditions,
    set_Current_City,
    toggleLoading
  })(Favorites)
);
