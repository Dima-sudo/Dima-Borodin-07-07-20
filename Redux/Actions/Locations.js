import React from 'react';
import axios from 'axios';

import { invalidateApiKey, turnOffFirstRender } from './Utils';
import { setCoordinates } from './Users';

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

      dispatch(toggleLoading());
    }
  };
};

// Main action, calls smaller actions and manages the full flow
export const get_Full_Info_By_Name = name => {
  return async (dispatch, getState) => {
    try {
      const { isFirstRender } = getState().Utils;
      dispatch(toggleLoading());

      if (isFirstRender) {
        // Geolocation on first render only
        dispatch(turnOffFirstRender());
        await navigator.geolocation.getCurrentPosition(
          async position => {
            _Fetch_Data_By_Geolocation(position, dispatch);
          },
          // If user blocked request for geolocation continue as usual
          async () => {
            _Fetch_Data_By_Name(name, dispatch);
          }
        );
      } else {
        _Fetch_Data_By_Name(name, dispatch);
      }
    } catch (err) {
      dispatch(invalidateApiKey());
      message.error(
        `Couldn't complete data fetch. Error: ${err.message}`,
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
    let filteredFavorites;

    if (currentFavorites.length !== 0) {
      filteredFavorites = currentFavorites.filter(favorite => {
        return favorite.EnglishName !== city.EnglishName;
      });
    }

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

export const toggleLoading = () => {
  return {
    type: 'LOCATIONS_IS_LOADING'
  };
};

/*
  Helper private functions. Not intended for outside use. Used for fetching the full home-page data flow.
*/
const _Fetch_Data_By_Name = async (name, dispatch) => {
  // Fetch city for key
  const res = await axios.get(
    `${LOCATIONS_BASE_URL}/cities/search?apikey=${API_KEY}&q=${name}`
  );

  // If no results are found
  if (res.data.length === 0) {
    message.info(
      `We're sorry we couldn't find that, try something else`,
      vars.NOTIFICATION_DURATION_MEDIUM
    );

    dispatch(toggleLoading());
    return;
  }

  const action = {
    type: 'CURRENT_CITY',
    payload: res.data[0]
  };

  dispatch(action);

  const key = res.data[0].Key;

  // Set current key
  dispatch(set_Current_Key(key));

  // Fetch conditions
  dispatch(get_Current_Conditions(key));

  //Fetch forecast
  dispatch(get_Forecast(key));
};

const _Fetch_Data_By_Geolocation = async (position, dispatch) => {
  await dispatch(
    setCoordinates(position.coords.latitude, position.coords.longitude)
  );

  const res = await axios.get(
    `${LOCATIONS_BASE_URL}/cities/geoposition/search?apikey=${API_KEY}&q=${position.coords.latitude},${position.coords.longitude}`
  );

  const action = {
    type: 'CURRENT_CITY',
    payload: res.data
  };

  dispatch(action);

  const key = res.data.Key;
  // Set current key
  dispatch(set_Current_Key(key));

  // Fetch conditions
  dispatch(get_Current_Conditions(key));

  //Fetch forecast
  dispatch(get_Forecast(key));
};
