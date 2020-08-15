import React, { memo, useState } from "react";
import { Row, Col, Card } from "antd";
import {
  SectionStyled,
  AlertStyled,
  BtnStyled,
  CardStyled,
  QuestionStyled,
  QuestionNo,
} from "./Styled";
import QuestionPanel from "./QuestionPanel";
import data from "../../quiz.json";

const QuizPanel = ({
  selected_values,
  correctAnswerIds,
  gotoQuestion,
  submitAnswer,
  answerStatus,
  percentAnswered,
  loadingAnswer,
  score,
  nextQuestion,
  finishQuiz,
  resetQuiz,
  closeQuiz,
  handleChange,
  module_id,
  locale,
  course,
  episode_id,
  quiz_id,
  questionOrder,
  episode,
  selectedAnswerIds,
}) => {
  const [quiz, setQuiz] = useState(data.quiz);
  const [questionNo, setQuestionNo] = useState(1);
  return (
    <SectionStyled id="quiz">
      <Row>
        <Col md={16} sm={16} style={{ margin: "0px auto" }}>
          <QuestionPanel
            question={quiz.questions[questionNo - 1]}
            questionNo={questionNo}
            totalQuestion={quiz.questions.length}
          />
        </Col>
      </Row>
    </SectionStyled>
  );
};

export default memo(QuizPanel);
