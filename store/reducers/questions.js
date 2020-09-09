// Authentication Constant
export const LOGOUT_USER = "LOGOUT_USER";

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGOUT_USER: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
