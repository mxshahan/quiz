import React, { useState, useEffect } from "react";
import SingleOption from "./SingleOption";
import { Radio, Checkbox } from "antd";
import { RadioStyled, CheckboxStyled, AnswerPanelStyled } from "./Styled";
import CustomCheckbox from "./CustomCheckbox";
import renderHTML from "react-render-html";

const AnswerPanel = ({
  type,
  answers,
  expectedAnswer,
  questionNo,
  correctAnswer,
  answerChecked,
}) => {
  const [checked, setChecked] = useState([]);

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

  const checkCorrect = (index) => {
    if (Array.isArray(correctAnswer)) {
      if (checked.includes(index)) {
        if (correctAnswer.includes(index)) {
          return "correct";
        } else {
          return "incorrect";
        }
      }
    }

    return "incorrect";
  };

  console.log(correctAnswer);

  return (
    <AnswerPanelStyled>
      {expectedAnswer > 1 && (
        <div style={{ marginBottom: 10 }}>Choose {expectedAnswer}</div>
      )}
      {Array.isArray(answers) &&
        answers.map((ans, index) => {
          const answer = JSON.parse(ans);
          const status = checkCorrect(index);
          return (
            // <CheckboxStyled
            //   key={ans}
            //   radio={expectedAnswer === 1}
            //   name="answer"
            //   label={answer.answer_text}
            //   value={index}
            //   onChange={handleChange(index)}
            //   checked={checked.includes(index)}
            //   disabled={markDisable(index)}
            //   status={status}
            // />
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
  );
};

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

export default AnswerPanel;
