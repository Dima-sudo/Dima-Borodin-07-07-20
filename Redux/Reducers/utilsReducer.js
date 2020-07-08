export default (state = { isLoading: false, isCelsius: true }, action) => {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return { ...state, isLoading: !state.isLoading };
    case 'TOGGLE_MODE':
      return { ...state, isCelsius: !state.isCelsius };

    default:
      return { ...state };
  }
};
