export default (state = { curQuery: [] }, action) => {
  switch (action.type) {
    case 'CITIES_AUTO_COMPLETE':
      return { ...state, curQuery: action.payload };

    default:
      return { ...state };
  }
};
