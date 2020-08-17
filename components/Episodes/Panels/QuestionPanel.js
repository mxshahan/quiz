import React, { useState, useEffect } from "react";
import { CardStyled, QuestionNo, QuestionStyled, BtnStyled } from "./Styled";
import AnswerPanel from "./AnswerPanel";
import { Progress } from "antd";
import { Button } from "semantic-ui-react";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";

const QuestionPanel = ({
  question,
  questionNo,
  nextQuestion,
  prevQuestion,
  totalQuestion,
  correctAnswerIds,
}) => {
  const [answerChecked, setAnswerChecked] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  useEffect(() => {
    setCorrectAnswer(null);
    setAnswerChecked(false);
  }, [questionNo]);

  const checkAnswer = () => {
    setCorrectAnswer(correctAnswerIds);
    setAnswerChecked(true);
  };

  console.log(correctAnswer);

  const percentage = (questionNo / totalQuestion) * 100 || 0;
  return (
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
        <Progress
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          percent={percentage.toFixed(1)}
        />
      </QuestionNo>
      <QuestionStyled
        dangerouslySetInnerHTML={{ __html: question.question_text }}
      />
      <AnswerPanel
        type="single"
        answers={question.answers}
        expectedAnswer={question.num_expected_answers}
        questionNo={questionNo}
        correctAnswer={correctAnswer}
        answerChecked={answerChecked}
      />
      <BtnStyled onClick={checkAnswer}>Check Answer</BtnStyled>
    </CardStyled>
  );
};

export default QuestionPanel;
