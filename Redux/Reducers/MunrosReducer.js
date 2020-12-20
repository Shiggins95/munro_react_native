const startingState = {
  munros: [],
  regions: {},
  loaded: false,
};

const MunroReducer = (state = startingState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'MUNROS_LOADED':
      return { munros: payload.munros, regions: payload.regions, loaded: true };
    default:
      return { ...state };
  }
};

export default MunroReducer;
