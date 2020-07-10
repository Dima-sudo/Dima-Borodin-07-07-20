import React, { useEffect } from 'react';
import vars from '../Resources/Objects/Variables';
import { getImageType, fahrenheitToCelsius } from '../Utils/helpers';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  get_Current_Conditions,
  get_Full_Info_By_Name,
  add_Favorite,
  remove_Favorite
} from '../Redux/Actions/Locations';

import WeatherCard from '../Components/WeatherCard';
import Glass from '../Components/Glass';
import SearchBar from '../Components/SearchBar';
import FavoritesButton from '../Components/FavoritesButton';
import Loader from '../Components/Loader';

import '../scss/Pages/Home.scss';

function Home(props) {
  const theme = props.theme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    let name;

    props.CurrentCity
      ? (name = props.CurrentCity.EnglishName)
      : (name = `${vars.DEFAULT_LOCATION_STRING}`);

    const fetchPageData = async () => {
      await props.get_Full_Info_By_Name(name);
    };

    fetchPageData();
  }, []);

  const renderFavoritesButton = () => {
    let isDanger = false;

    if (props.Favorites.length > 0) {
      props.Favorites.forEach(city => {
        if (props.CurrentCity.EnglishName === city.EnglishName) isDanger = true;
      });
    }

    return isDanger ? (
      <FavoritesButton
        type='danger'
        onClick={() => props.remove_Favorite(props.CurrentCity)}
      />
    ) : (
      <FavoritesButton
        type='primary'
        onClick={() => props.add_Favorite(props.CurrentCity)}
        theme={theme}
      />
    );
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
        <Loader />
      ) : (
        <>
          <Glass className='glass-section__searchbar slide-in' theme={theme}>
            <SearchBar />
          </Glass>

          <Glass className='slide-in' theme={theme}>
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
                {renderFavoritesButton()}
              </section>
            </section>
            <section className='weather-forecast'>
              {props.CurrentForecast.map(item => {
                const currentHour = new Date().getHours();
                const isDay = currentHour >= 6 && currentHour <= 19;

                // Day of the week
                const day = moment.unix(item.EpochDate).format('dddd');

                // API provides 5 day forecast temps in fahrenheit only, convert the values to celsius if that mode is selected
                const weatherDegrees = props.isCelsius
                  ? `${fahrenheitToCelsius(
                      item.Temperature.Minimum.Value
                    )} | ${fahrenheitToCelsius(
                      item.Temperature.Maximum.Value
                    )}C`
                  : `${item.Temperature.Minimum.Value} | ${item.Temperature.Maximum.Value}F`;
                //

                return isDay ? (
                  <WeatherCard
                    type={getImageType(item.Day.Icon)}
                    currentWeather={item.Day.IconPhrase}
                    weatherDegrees={weatherDegrees}
                    name={day}
                    key={item.EpochDate}
                  />
                ) : (
                  <WeatherCard
                    type={getImageType(item.Night.Icon)}
                    currentWeather={item.Night.IconPhrase}
                    weatherDegrees={weatherDegrees}
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
    isLoading: store.Locations.isLoading,
    isCelsius: store.Utils.isCelsius,
    Favorites: store.Locations.Favorites,
    theme: store.Utils.theme,
    User: store.User
  };
};

export default React.memo(
  connect(mapStateToProps, {
    add_Favorite,
    remove_Favorite,
    get_Current_Conditions,
    get_Full_Info_By_Name
  })(Home)
);
