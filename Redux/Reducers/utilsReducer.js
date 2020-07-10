export default (
  state = {
    isLoading: false,
    isCelsius: true,
    drawerVisible: false,
    cloudAnimationVisible: true,
    theme: 'light',
    hasValidApiKey: true,
    isFirstRender: true
  },
  action
) => {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return { ...state, isLoading: !state.isLoading };
    case 'TOGGLE_MODE':
      return { ...state, isCelsius: !state.isCelsius };
    case 'TOGGLE_DRAWER':
      return { ...state, drawerVisible: !state.drawerVisible };
    case 'TOGGLE_CLOUD_ANIMATION':
      return { ...state, cloudAnimationVisible: !state.cloudAnimationVisible };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'INVALIDATE_API_KEY':
      return { ...state, hasValidApiKey: false };
    case 'TURN_OFF_FIRST_RENDER':
      return { ...state, isFirstRender: false };

    default:
      return { ...state };
  }
};
