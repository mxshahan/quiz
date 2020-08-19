import React, { useState, useEffect, Fragment } from "react";
import { CardStyled, QuestionNo, QuestionStyled } from "./Styled";
import AnswerPanel from "./AnswerPanel";
import { Progress } from "antd";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import renderHTML from "react-render-html";

import { useRouter } from "next/router";

const QuestionPanel = ({
  question,
  questionNo,
  nextQuestion,
  prevQuestion,
  totalQuestion,
  correctAnswerIds,
  ...props
}) => {
  const [answerChecked, setAnswerChecked] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setCorrectAnswer(null);
    setAnswerChecked(false);
  }, [questionNo]);

  const checkAnswer = () => {
    setCorrectAnswer(correctAnswerIds);
    setAnswerChecked(true);
  };

  const handleScore = (status) => {
    console.log(status);
    if (status) {
      setScore(score + 1);
    }
  };

  const seeResult = () => {
    router.push("/lastpage?totalQuestion=" + totalQuestion + "&score=" + score);
  };

  const percentage = (score / totalQuestion) * 100 || 0;
  const isLastQuestion = totalQuestion === questionNo;
  
  return (
    <Fragment>
      <Progress
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
        percent={percentage.toFixed(1)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#fff",
          padding: 10,
          boxShadow: "0px 2px 20px 1px #bbb",
        }}
      />
      <CardStyled>
        <QuestionNo>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>
              QUESTION {questionNo}/{totalQuestion}
            </span>
            <span>
              <CaretLeftOutlined
                onClick={prevQuestion}
                style={{ cursor: "pointer" }}
              />
              <CaretRightOutlined
                onClick={nextQuestion}
                style={{ cursor: "pointer" }}
              />
            </span>
          </div>
          <div></div>
        </QuestionNo>
        <QuestionStyled>{renderHTML(question.question_text)}</QuestionStyled>
        <AnswerPanel
          type="single"
          answers={question.answers}
          expectedAnswer={question.num_expected_answers}
          questionNo={questionNo}
          correctAnswer={correctAnswer}
          answerChecked={answerChecked}
          nextQuestion={nextQuestion}
          handleCheckAnswer={checkAnswer}
          handleScore={handleScore}
          explanation={question.explanation}
          isLastQuestion={isLastQuestion}
          seeResult={seeResult}
        />
      </CardStyled>
    </Fragment>
  );
};

export default QuestionPanel;
