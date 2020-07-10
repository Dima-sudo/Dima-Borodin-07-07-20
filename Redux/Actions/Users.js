export const setCoordinates = (lat, lon) => {
  return {
    type: 'SET_USER_COORDINATES',
    payload: {
      lat,
      lon
    }
  };
};
