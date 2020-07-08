import axios from 'axios';

import { message } from 'antd';
import vars from '../../Resources/Objects/Variables';

const API_KEY = process.env.WEATHER_API_KEY;
const LOCATIONS_BASE_URL = process.env.LOCATIONS_BASE_URL;

export const get_Auto_Complete = query => {
  return async dispatch => {
    try {
      if (query.length < 2) return;

      const res = await axios.get(
        `${LOCATIONS_BASE_URL}/cities/autocomplete?apikey=${API_KEY}&q=${query}`
      );

      console.log('Autocomplete response is :');
      console.log(res.data);

      const formatted_City_List = [];

      // Format
      res.data.forEach((location, i) => {
        const city = {
          value: location.LocalizedName,
          label: `${location.LocalizedName} - ${location.Country.LocalizedName}`,
          key: `${location.Key + i}`
        };

        formatted_City_List.push(city);
      });

      const action = {
        type: 'CITIES_AUTO_COMPLETE',
        payload: formatted_City_List
      };

      dispatch(action);
    } catch (err) {
      message.error(
        `Couldn't fetch Auto-Complete city list. Error: ${err.message}`,
        vars.NOTIFICATION_DURATION_MEDIUM
      );
    }
  };
};
