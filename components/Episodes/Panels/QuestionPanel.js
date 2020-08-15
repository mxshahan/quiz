import React from "react";
import { CardStyled, QuestionNo, QuestionStyled, BtnStyled } from "./Styled";
import AnswerPanel from "./AnswerPanel";

const QuestionPanel = ({ question, questionNo, totalQuestion }) => {
  return (
    <CardStyled>
      <div className="content-box">
        <div className="question-sec">
          <QuestionNo>
            QUESTION {questionNo}/{totalQuestion}
          </QuestionNo>
          <QuestionStyled
            dangerouslySetInnerHTML={{ __html: question.question_text }}
          />
        </div>
        <AnswerPanel type="single" answers={question.answers} />
        <BtnStyled type="primary">Check Ans</BtnStyled>
      </div>
    </CardStyled>
  );
};

export default QuestionPanel;
