import React, { memo, useState } from "react";
import { Row, Col, Card, Progress } from "antd";
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
  // nextQuestion,
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

  const nextQuestion = () => {
    if (questionNo < quiz.questions.length) {
      setQuestionNo(questionNo + 1);
    }
  };

  const prevQuestion = () => {
    if (questionNo > 1) {
      setQuestionNo(questionNo - 1);
    }
  };

  const question = quiz.questions[questionNo - 1];

  return (
    <SectionStyled id="quiz">
      <Row>
        <Col md={16} sm={16} style={{ margin: "0px auto" }}>
          <QuestionPanel
            question={question}
            questionNo={questionNo}
            nextQuestion={nextQuestion}
            prevQuestion={prevQuestion}
            totalQuestion={quiz.questions.length}
            correctAnswerIds={question.correct_answer_ids}
          />
        </Col>
      </Row>
    </SectionStyled>
  );
};

export default memo(QuizPanel);
