import React, { useState, useEffect } from "react";
import { Button, Radio } from "antd";
import { FlagOutlined } from "@ant-design/icons";
import {
  RadioStyled,
  CheckboxStyled,
  DivSpace,
  StyledFlagOutlined,
} from "./exam.style";
import { BtnStyled } from "../Episodes/Panels/Styled";

const AnswerPanel = ({
  question,
  answeredQues,
  setAnsweredQues,
  handleNatigation,
  mood,
  setMood,
  markedQues,
  setMarkedQues,
  isMarked,
}) => {
  const [currentValue, setCurrentValue] = useState([]);
  useEffect(() => {
    const data = answeredQues.find(
      (item) => item.item_order === question.item_order
    );
    if (data) {
      setCurrentValue(data.correct_answer_ids);
      setMood(1);
    } else {
      setCurrentValue([]);
      setMood(0);
    }
  }, [question.item_order]);
  // set to state on radio button change
  const onChangeRadio = (e) => {
    setCurrentValue([e.target.value]);
  };
  // set to state on checkbox change
  const onChangeCheckbox = (e) => {
    const newValue = e.target.value;
    let arr = currentValue;
    const index = currentValue.indexOf(newValue);
    if (index > -1) {
      arr.splice(index, 1);
    } else arr.push(newValue);
    setCurrentValue([...arr]);
  };
  // set to state on mark change
  const onChangeMark = (newValue) => {
    let arr = markedQues;
    const index = arr.indexOf(newValue);
    if (index > -1) {
      arr.splice(index, 1);
    } else arr.push(newValue);
    setMarkedQues([...arr]);
  };
  // call on answer action
  const handleAnswer = () => {
    if (mood === 1) {
      setMood(0);
      return;
    }
    let isMatched = true;
    let newArray = answeredQues.map((item) => {
      if (item.item_order === question.item_order) {
        item.correct_answer_ids = currentValue;
        isMatched = false;
      }
      return item;
    });
    newArray = newArray.filter(
      (item) => item?.correct_answer_ids?.length !== 0
    );
    if (isMatched)
      newArray.push({
        item_order: question.item_order,
        correct_answer_ids: currentValue,
      });
    setAnsweredQues(newArray);
    handleNatigation(question.item_order + 1);
  };
  // finding every checkbox value
  const findCheckboxValue = (idx) => {
    const data = currentValue.find((item) => item === idx);
    if (data !== undefined) return true;
    else return false;
  };
  // check if checkbox should disable
  const isCheckedDisabled = (idx) => {
    if (mood === 1) return true;
    const data = currentValue.find((item) => item === idx);
    if (data !== undefined) return false;
    return question.num_expected_answers === currentValue.length;
  };
  // check if answerButton should disable
  const isAnsDisabled = () => {
    if (mood === 1) return false;
    return question.num_expected_answers !== currentValue.length;
  };

  return (
    <DivSpace direction="vertical">
      {question.num_expected_answers === 1 ? (
        <Radio.Group
          onChange={onChangeRadio}
          value={currentValue.length !== 0 ? currentValue[0] : ""}
          disabled={mood === 1}
        >
          {question?.answers?.map(({ answer_text }, idx) => (
            <RadioStyled value={idx} key={idx}>
              {answer_text}
            </RadioStyled>
          ))}
        </Radio.Group>
      ) : (
        <>
          {question?.answers?.map(({ answer_text }, idx) => (
            <CheckboxStyled
              value={idx}
              key={idx}
              onChange={onChangeCheckbox}
              checked={findCheckboxValue(idx)}
              disabled={isCheckedDisabled(idx)}
            >
              {answer_text}
            </CheckboxStyled>
          ))}
        </>
      )}
      <DivSpace direction="horizontal">
        <BtnStyled
          color="#00a6ff"
          onClick={handleAnswer}
          disabled={isAnsDisabled()}
        >
          {mood === 1 ? "Change answer" : "Answer"}
        </BtnStyled>
        <BtnStyled
          color="#F3F5FB"
          onClick={() => onChangeMark(question.item_order)}
        >
          <StyledFlagOutlined />
          <span style={{ color: "#233252" }}>
            {isMarked ? "Unflag for Review" : "Flag for Review"}
          </span>
        </BtnStyled>
      </DivSpace>
    </DivSpace>
  );
};

export default AnswerPanel;
