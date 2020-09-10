import { SUBMIT_EXAM } from "../reducers/questions";

export const submitExam = (payload) => ({
  type: SUBMIT_EXAM,
  payload,
});
