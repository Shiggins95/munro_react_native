const startingState = {
  munros: [],
  loaded: false,
};

const MunroReducer = (state = startingState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'MUNROS_LOADED':
      console.log('munro reducer triggered');
      return { munros: payload, loaded: true };
    default:
      return { ...state };
  }
};

export default MunroReducer;
