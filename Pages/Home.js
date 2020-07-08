import React, { useEffect, useState } from 'react';
import vars from '../Resources/Objects/Variables';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  get_City_By_Text,
  get_Current_Conditions,
  get_Current_City_Conditions
} from '../Redux/Actions/Locations';
import { toggleLoading } from '../Redux/Actions/Utils';

import WeatherCard from '../Components/WeatherCard';
import Glass from '../Components/Glass';
import SearchBar from '../Components/SearchBar';
import { Button, Tooltip } from 'antd';

import '../scss/Pages/Home.scss';

function Home(props) {
  const heartIcon = <i className='fas fa-heart' />;
  const [key, setKey] = useState(vars.DEFAULT_LOCATION_KEY);

  useEffect(() => {
    const fetchConditions = async () => {
      await props.toggleLoading();

      let name;
      props.CurrentCity
        ? (name = props.CurrentCity.EnglishName)
        : (name = `${vars.DEFAULT_LOCATION_STRING}`);

      await props.get_Current_City_Conditions(name);
      setKey(props.CurrentKey);

      await props.toggleLoading();
    };
    console.log('key is');
    console.log(key);
    fetchConditions();
  }, [key]);

  // Maps the API image codes(int) and returns a String of the image type to render
  const getImageType = integer => {
    // Wanted to use my own assets, another approach would be to use the images on the API's website
    // Codes according to the API docs
    if (integer <= 5 || integer == 30) return 'Sunny';
    if (
      (integer > 5 && integer <= 11) ||
      integer == 20 ||
      integer == 32 ||
      integer == 35
    )
      return 'Cloudy';
    if (integer == 14 || integer == 17 || integer == 21) return 'SunnyRain';
    if (integer == 15 || integer == 16 || integer == 41 || integer == 42)
      return 'Storm';
    if ((integer > 11 && integer <= 19) || integer == 39 || integer == 40)
      return 'Rain';
    if (
      (integer > 21 && integer <= 29) ||
      integer == 31 ||
      integer == 43 ||
      integer == 44
    )
      return 'Snow';
    if (integer > 32 && integer <= 38) return 'Moon';

    return null;
  };

  let curFahrenheit = props.CurrentConditions
    ? props.CurrentConditions.Temperature.Imperial.Value
    : null;
  let curCelsius = props.CurrentConditions
    ? props.CurrentConditions.Temperature.Metric.Value
    : null;

  return (
    <main id='home-page__wrapper' className='container'>
      {props.isLoading ||
      !props.CurrentCity ||
      !props.CurrentConditions ||
      !props.CurrentForecast ? (
        <div>Loading....</div>
      ) : (
        <>
          <Glass className='glass-section__searchbar'>
            <SearchBar />
          </Glass>
          <Glass>
            <section className='weather-meta__section'>
              <WeatherCard
                type={getImageType(props.CurrentConditions.WeatherIcon)}
                currentWeather={
                  props.isCelsius ? `${curCelsius}C` : `${curFahrenheit}F`
                }
                name={props.CurrentCity.EnglishName}
                country={props.CurrentCity.Country.EnglishName}
                minified
              />
              <header>{props.CurrentConditions.WeatherText}</header>
              <section className='favorites-section'>
                <Tooltip title='Add to favorites? :)'>
                  <Button
                    type='primary'
                    shape='circle'
                    icon={heartIcon}
                    className='favorites-button'
                  />
                </Tooltip>
              </section>
            </section>
            <section className='weather-forecast'>
              {props.CurrentForecast.map(item => {
                const currentHour = new Date().getHours();
                const isDay = currentHour >= 6 && currentHour <= 19;

                // Day of the week
                const day = moment.unix(item.EpochDate).format('dddd');

                return isDay ? (
                  <WeatherCard
                    type={getImageType(item.Day.Icon)}
                    currentWeather={item.Day.IconPhrase}
                    name={day}
                    key={item.EpochDate}
                  />
                ) : (
                  <WeatherCard
                    type={getImageType(item.Night.Icon)}
                    currentWeather={item.Night.IconPhrase}
                    name={day}
                    key={item.EpochDate}
                  />
                );
              })}
            </section>
          </Glass>
        </>
      )}
    </main>
  );
}

const mapStateToProps = store => {
  return {
    CurrentKey: store.Locations.CurrentKey,
    CurrentConditions: store.Locations.CurrentConditions,
    CurrentCity: store.Locations.CurrentCity,
    CurrentForecast: store.Locations.CurrentForecast,
    isLoading: store.Utils.isLoading,
    isCelsius: store.Utils.isCelsius
  };
};

export default connect(mapStateToProps, {
  get_City_By_Text,
  get_Current_Conditions,
  toggleLoading,
  get_Current_City_Conditions
})(Home);
