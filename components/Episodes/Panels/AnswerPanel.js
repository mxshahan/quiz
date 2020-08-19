import React, { useState, useEffect, Fragment } from "react";
import { AlertStyled, AnswerPanelStyled, BtnStyled } from "./Styled";
import CustomCheckbox from "./CustomCheckbox";
import renderHTML from "react-render-html";

const AnswerPanel = ({
  type,
  answers,
  expectedAnswer,
  questionNo,
  correctAnswer,
  answerChecked,
  nextQuestion,
  handleCheckAnswer,
  handleScore,
  explanation,
}) => {
  const [checked, setChecked] = useState([]);
  const [isCorrect, setIsCorrect] = useState(true);

  useEffect(() => {
    setChecked([]);
  }, [questionNo]);

  const handleChange = (index) => (value) => {
    if (answerChecked) return;
    if (expectedAnswer === 1) {
      setChecked([index]);
    } else {
      const i = checked.indexOf(index);
      if (i !== -1) {
        checked.splice(i, 1);
      } else {
        if (checked.length < expectedAnswer) {
          checked.push(index);
        }
      }
      setChecked([...checked]);
    }
  };

  const markDisable = (index) => {
    return (
      expectedAnswer > 1 &&
      !checked.includes(index) &&
      checked.length === expectedAnswer
    );
  };

  const checkAnswer = () => {
    if (checked.length !== expectedAnswer) return alert("Select answer");

    handleCheckAnswer();
  };

  useEffect(() => {
    if (Array.isArray(correctAnswer)) {
      let correct = true;
      for (var i of checked) {
        const s = checkCorrect(i);
        if (s === "incorrect") {
          correct = false;
          break;
        }
      }
      // console.log(correct);
      setIsCorrect(correct);
      handleScore(correct);
    }
  }, [correctAnswer]);

  const checkCorrect = (index) => {
    if (Array.isArray(correctAnswer) && answerChecked) {
      if (correctAnswer.includes(index)) {
        return "correct";
      } else {
        if (checked.includes(index)) {
          return "incorrect";
        }
      }
    }

    return null;
  };

  let alertStatus = null;

  if (isCorrect && answerChecked) {
    alertStatus = "success";
  } else if (!isCorrect && answerChecked) {
    alertStatus = "error";
  }

  return (
    <Fragment>
      <AnswerPanelStyled>
        {expectedAnswer > 1 && (
          <div style={{ marginBottom: 10 }}>Choose {expectedAnswer}</div>
        )}
        {Array.isArray(answers) &&
          answers.map((ans, index) => {
            const answer = JSON.parse(ans);
            const status = checkCorrect(index);
            return (
              <CustomCheckbox
                key={ans}
                status={status}
                label={renderHTML(answer.answer_text)}
                onChange={handleChange(index)}
                checked={checked.includes(index)}
                disabled={markDisable(index)}
                answerChecked={answerChecked}
              />
            );
          })}
      </AnswerPanelStyled>

      {alertStatus && (
        <Fragment>
          <AlertStyled
            message={alertStatus === "success" ? "Great Job!" : "Sorry !!!"}
            description={
              alertStatus === "success"
                ? "You have successfully done this question. Keep continue"
                : "You have missed this. Don't worry do better to next question"
            }
            type={alertStatus}
            showIcon
          />
          <AlertStyled
            message="Explanation"
            description={renderHTML(explanation)}
            type="success"
          />
        </Fragment>
      )}

      {answerChecked ? (
        <BtnStyled onClick={nextQuestion}>Next Questionr</BtnStyled>
      ) : (
        <BtnStyled onClick={checkAnswer}>Check Answer</BtnStyled>
      )}
    </Fragment>
  );
};

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

export default AnswerPanel;
