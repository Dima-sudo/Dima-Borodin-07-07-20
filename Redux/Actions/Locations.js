import React from 'react';
import axios from 'axios';

import { invalidateApiKey, toggleLoading } from './Utils';

import { message, notification } from 'antd';
import { SmileOutlined, InfoCircleOutlined } from '@ant-design/icons';

import vars from '../../Resources/Objects/Variables';

const LOCATIONS_BASE_URL = process.env.LOCATIONS_BASE_URL;
const CONDITIONS_BASE_URL = process.env.CONDITIONS_BASE_URL;
const FORECAST_BASE_URL = process.env.FORECAST_BASE_URL;
const API_KEY = process.env.WEATHER_API_KEY;

export const get_Current_Conditions = key => {
  return async dispatch => {
    let res;
    try {
      res = await axios.get(`${CONDITIONS_BASE_URL}/${key}?apikey=${API_KEY}`);

      if (res.status === 200) {
        message.success(
          'Fetched current coditions successfully',
          vars.NOTIFICATION_DURATION_SHORT
        );
      }

      const action = {
        type: 'CURRENT_CONDITIONS',
        payload: res.data[0]
      };

      dispatch(action);
    } catch (err) {
      // If API key is depleted
      if (!res) {
        dispatch(invalidateApiKey());
      }
      //

      message.error(
        `Couldn't fetch city via KEY. Error: ${err.message}`,
        vars.NOTIFICATION_DURATION_MEDIUM
      );
    }

    console.log('Response is: ');
    console.log(res);
  };
};

export const get_Current_City_Conditions = name => {
  return async dispatch => {
    let res;
    try {
      await dispatch(toggleLoading());
      // Fetch city for key
      res = await axios.get(
        `${LOCATIONS_BASE_URL}/cities/search?apikey=${API_KEY}&q=${name}`
      );

      // If no results are found
      if (res.data.length === 0) {
        message.info(
          `We're sorry we couldn't find that, try something else`,
          vars.NOTIFICATION_DURATION_MEDIUM
        );

        return;
      }

      let action = {
        type: 'CURRENT_CITY',
        payload: res.data[0]
      };

      dispatch(action);

      console.log(res);

      const key = res.data[0].Key;

      // Set current key
      dispatch(set_Current_Key(key));

      // Fetch conditions
      dispatch(get_Current_Conditions(key));

      //Fetch forecast
      dispatch(get_Forecast(key));

      await dispatch(toggleLoading());
    } catch (err) {
      message.error(
        `Couldn't fetch currently selected city's conditions. Error: ${err.message}`,
        vars.NOTIFICATION_DURATION_MEDIUM
      );
    }
  };
};

export const set_Current_Key = key => {
  return {
    type: 'SET_KEY',
    payload: key
  };
};

export const get_Forecast = key => {
  return async dispatch => {
    let res;
    try {
      // Fetch city for key
      res = await axios.get(
        `${FORECAST_BASE_URL}/daily/5day/${key}?apikey=${API_KEY}`
      );

      let action = {
        type: 'CURRENT_FORECAST',
        payload: res.data.DailyForecasts
      };

      console.log('res is');
      console.log(res);

      dispatch(action);
    } catch (err) {
      message.error(
        `Couldn't fetch daily forecasts. Error: ${err.message}`,
        vars.NOTIFICATION_DURATION_MEDIUM
      );
    }
  };
};

export const add_Favorite = city => {
  notification.open({
    message: 'Favorite Added',
    description: 'Great choice!',
    duration: vars.NOTIFICATION_DURATION_SHORT,
    icon: <SmileOutlined style={{ color: '#00b3ff' }} />
  });

  return {
    type: 'ADD_FAVORITE',
    payload: city
  };
};

export const remove_Favorite = city => {
  return (dispatch, getState) => {
    const currentFavorites = getState().Locations.Favorites;
    if (currentFavorites.length === 0) return;

    const filteredFavorites = currentFavorites.filter(favorite => {
      return favorite.EnglishName !== city.EnglishName;
    });

    const action = {
      type: 'REMOVE_FAVORITE',
      payload: filteredFavorites
    };

    notification.open({
      message: 'Favorite Removed',
      description: 'Sorry to see you go',
      duration: vars.NOTIFICATION_DURATION_SHORT,
      icon: <InfoCircleOutlined style={{ color: '#108ee9' }} />
    });

    dispatch(action);
  };
};

export const reset_Saved_Conditions = () => {
  return {
    type: 'RESET_SAVED_CONDITIONS'
  };
};

export const set_Current_City = city => {
  return {
    type: 'SET_CURRENT_CITY',
    payload: city
  };
};
