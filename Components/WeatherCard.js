import React from 'react';
import PropTypes from 'prop-types';

import { PlusOutlined } from '@ant-design/icons';
import { Card, Empty } from 'antd';
const { Meta } = Card;

import '../scss/Components/WeatherCard.scss';
import Icons from '../Resources/Objects/Icons';

function WeatherCard({
  type,
  id,
  name,
  currentWeather,
  withId,
  withAction,
  minified,
  country
}) {
  const {
    Sunny,
    SunnyRain,
    Cloudy,
    PartlyCloudy,
    Rain,
    Storm,
    Snow,
    Moon
  } = Icons;
  let image;

  switch (type) {
    case 'Sunny':
      image = Sunny;
      break;
    case 'SunnyRain':
      image = SunnyRain;
      break;
    case 'Cloudy':
      image = Cloudy;
      break;
    case 'PartlyCloudy':
      image = PartlyCloudy;
      break;
    case 'Rain':
      image = Rain;
      break;
    case 'Storm':
      image = Storm;
      break;
    case 'Moon':
      image = Moon;
      break;
    case 'Snow':
      image = Snow;
      break;

    default:
      image = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  // Has 2 variants, Mini and Standard
  return minified ? (
    <div id='weather-thumbnail__wrapper'>
      <img src={image} alt='current-weather-image' />
      <span>
        <p>{name}</p>
        {country ? <p>{country}</p> : null}
        <p>{currentWeather}</p>
      </span>
    </div>
  ) : (
    <Card
      style={withAction ? { cursor: 'pointer' } : null}
      title={withId ? `ID: ${id}` : null}
      className='weather-card__wrapper'
      cover={<img alt='weather-image' src={image} />}
      bordered={false}
      actions={withAction ? [<PlusOutlined key='plus_outlined' />] : null}
      alt='weather_forecast_card'
    >
      <Meta title={name} description={currentWeather} />
    </Card>
  );
}

WeatherCard.propTypes = {
  name: PropTypes.string.isRequired,
  currentWeather: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'Sunny',
    'SunnyRain',
    'Cloudy',
    'PartlyCloudy',
    'Rain',
    'Storm',
    'Moon',
    'Snow'
  ]).isRequired,
  // Displays a thumbnail version
  minified: PropTypes.bool,
  // Exists only in thumbnail
  country: PropTypes.string,
  // Displays the ID on top of the card
  withId: PropTypes.bool,
  id: PropTypes.string,
  // Adds a Clickable plus icon for more info
  withAction: PropTypes.bool
};

WeatherCard.defaultProps = {
  id: null,
  withId: false,
  withAction: false,
  minified: false
};

export default WeatherCard;
