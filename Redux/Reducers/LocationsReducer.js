import vars from '../../Resources/Objects/Variables';

export default (
  state = {
    isLoading: false,
    CurrentKey: vars.DEFAULT_LOCATION_KEY,
    CurrentCity: null,
    CurrentConditions: null,
    CurrentForecast: null,
    Favorites: []
  },
  action
) => {
  switch (action.type) {
    case 'LOCATIONS_IS_LOADING':
      return { ...state, isLoading: !state.isLoading };
    case 'CURRENT_CONDITIONS':
      return { ...state, CurrentConditions: action.payload };
    case 'CURRENT_CITY':
      return {
        ...state,
        CurrentCity: action.payload,
        isLoading: false
      };
    case 'CURRENT_FORECAST':
      return { ...state, CurrentForecast: action.payload };
    case 'SET_KEY':
      return { ...state, CurrentKey: action.payload };
    case 'ADD_FAVORITE':
      return { ...state, Favorites: [...state.Favorites, action.payload] };
    case 'REMOVE_FAVORITE':
      const newFavorites = [...action.payload];
      return {
        ...state,
        Favorites: action.payload.length === 0 ? [] : newFavorites
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
