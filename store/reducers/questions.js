// Authentication Constant
export const SUBMIT_EXAM = "SUBMIT_EXAM";

const initialState = {
  duration: "",
  allQuesitons: [],
  answeredQues: 0,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SUBMIT_EXAM: {
      return { ...initialState, ...payload };
    }

    default: {
      return state;
    }
  }
};
