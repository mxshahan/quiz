import { getDefaultStore, setDefaultStore } from "../utils/session";

export const saveState = (state) => {
  try {
    // Parsing auth data from Redux store
    let stateFilter = state;
    setDefaultStore(stateFilter.questions);
  } catch (err) {
    // Ignore write error
  }
};

/* Use an IIFE to export the persisted state in a variable */
export const persistedState = (() => {
  try {
    const questions = getDefaultStore();
    console.log(questions)
    // if (Object.keys(questions).length === 0) return undefined;
    return {
      questions,
    };
  } catch (err) {
    return undefined;
  }
})();
