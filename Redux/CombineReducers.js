import { combineReducers } from 'redux';

import utilsReducer from '../Redux/Reducers/utilsReducer';
import locationsReducer from '../Redux/Reducers/LocationsReducer';
import queriesReducer from '../Redux/Reducers/QueriesReducer';
import usersReducer from '../Redux/Reducers/usersReducer';

export default combineReducers({
  Utils: utilsReducer,
  Locations: locationsReducer,
  Queries: queriesReducer,
  User: usersReducer
});
