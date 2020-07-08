import axios from 'axios';

import { message } from 'antd';
import vars from '../../Resources/Objects/Variables';

const LOCATIONS_BASE_URL = process.env.LOCATIONS_BASE_URL;
const CONDITIONS_BASE_URL = process.env.CONDITIONS_BASE_URL;
const FORECAST_BASE_URL = process.env.FORECAST_BASE_URL;
const API_KEY = process.env.WEATHER_API_KEY;

// export const get_City_By_Text = name => {
//   let res;
//   return async dispatch => {
//     try {
//       res = await axios.get(
//         `${LOCATIONS_BASE_URL}/cities/search?apikey=${API_KEY}&q=${name}`
//       );

//       const action = {
//         type: 'CURRENT_CITY',
//         payload: res.data[0]
//       };

//       dispatch(action);
//     } catch (err) {
//       message.error(`Couldn't fetch city via TEXT. Error: ${err.message}`, 5);
//     }

//     console.log('Response is: ');
//     console.log(res.data[0]);
//   };
// };

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
      // Fetch city for key
      res = await axios.get(
        `${LOCATIONS_BASE_URL}/cities/search?apikey=${API_KEY}&q=${name}`
      );

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
