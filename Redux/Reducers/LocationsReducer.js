import vars from '../../Resources/Objects/Variables';

export default (
  state = {
    CurrentKey: vars.DEFAULT_LOCATION_KEY,
    CurrentCity: null,
    CurrentConditions: null,
    CurrentForecast: null,
    Favorites: []
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
    case 'ADD_FAVORITE':
      return { ...state, Favorites: [...state.Favorites, action.payload] };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        Favorites: action.payload.length === 0 ? [] : [...action.payLoad]
      };
    case 'RESET_SAVED_CONDITIONS':
      return {
        ...state,
        CurrentForecast: null,
        CurrentConditions: null
      };
    case 'SET_CURRENT_CITY':
      return {
        ...state,
        CurrentCity: action.payload
      };
    default:
      return { ...state };
  }
};
