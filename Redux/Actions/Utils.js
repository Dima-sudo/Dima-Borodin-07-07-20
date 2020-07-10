export const toggleLoading = () => {
  return {
    type: 'TOGGLE_LOADING'
  };
};

export const toggleMode = () => {
  return {
    type: 'TOGGLE_MODE'
  };
};

export const toggleDrawer = () => {
  return {
    type: 'TOGGLE_DRAWER'
  };
};

export const toggleCloudAnimation = () => {
  return {
    type: 'TOGGLE_CLOUD_ANIMATION'
  };
};

export const toggleTheme = () => {
  return {
    type: 'TOGGLE_THEME'
  };
};

export const invalidateApiKey = () => {
  return {
    type: 'INVALIDATE_API_KEY'
  };
};

// Determines when to fetch via geolocation
export const turnOffFirstRender = () => {
  return {
    type: 'TURN_OFF_FIRST_RENDER'
  };
};
