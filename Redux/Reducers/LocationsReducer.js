import vars from '../../Resources/Objects/Variables';
export default (
  state = {
    CurrentKey: vars.DEFAULT_LOCATION_KEY,
    CurrentCity: null,
    CurrentConditions: null,
    CurrentForecast: null
  },
  action
) => {
  switch (action.type) {
    case 'CURRENT_CONDITIONS':
      return { ...state, CurrentConditions: action.payload };
    case 'CURRENT_CITY':
      return { ...state, CurrentCity: action.payload };
    case 'CURRENT_FORECAST':
      return { ...state, CurrentForecast: action.payload };
    case 'SET_KEY':
      return { ...state, CurrentKey: action.payload };
    default:
      return { ...state };
  }
};
