export default (
  state = {
    coordinates: null
  },
  action
) => {
  switch (action.type) {
    case 'SET_USER_COORDINATES':
      const userCoordinates = { ...action.payload };
      return { ...state, coordinates: userCoordinates };

    default:
      return { ...state };
  }
};
