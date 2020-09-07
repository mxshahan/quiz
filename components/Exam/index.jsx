import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import { FlagOutlined, LockOutlined } from "@ant-design/icons";
import { Question, CardExtra } from "./exam.style";

import AnswerPanel from "./AnswerPanel";
import QuestionButtons from "./QuestionButtons";

import { questions } from "./data.json";
import renderHTML from "react-render-html";

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [answeredQues, setAnsweredQues] = useState([]);
  const [markedQues, setMarkedQues] = useState([]);
  const [mood, setMood] = useState(0);
  const [isCrntMarked, setMarked] = useState(false);

  useEffect(() => {
    const data = markedQues.find((item) => item === currentQuestion.item_order);
    if (data === undefined) setMarked(false);
    else setMarked(true);
  }, [markedQues, currentQuestion]);

  const handleNatigation = (item_order) => {
    const cnt = questions.find((item) => item.item_order === item_order);
    if (cnt) setCurrentQuestion(cnt);
    else setCurrentQuestion(questions[0]);
  };
  return (
    <Row gutter={[25, 25]} style={{ padding: "30px 0" }}>
      <Col span="2"></Col>
      <Col lg={12} md={20} sm={20} xs={20}>
        <Card
          type="inner"
          title={`Question no ${currentQuestion.item_order + 1}`}
          extra={
            <CardExtra>
              {!!mood && <LockOutlined style={{ marginRight: "10px" }} />}
              {isCrntMarked && <FlagOutlined style={{ color: "#FF1575" }} />}
            </CardExtra>
          }
        >
          <Question>{renderHTML(currentQuestion.question_text)}</Question>
          <AnswerPanel
            length={questions.length}
            question={currentQuestion}
            answeredQues={answeredQues}
            setAnsweredQues={setAnsweredQues}
            handleNatigation={handleNatigation}
            mood={mood}
            setMood={setMood}
            markedQues={markedQues}
            setMarkedQues={setMarkedQues}
            isMarked={isCrntMarked}
          />
        </Card>
      </Col>
      <Col lg={0} md={2} sm={2} xs={2}></Col>
      <Col lg={0} md={2} sm={2} xs={2}></Col>

      <QuestionButtons
        questions={questions}
        handleNatigation={handleNatigation}
        markedQues={markedQues}
        answeredQues={answeredQues}
        currentQuestion={currentQuestion}
      />
      <Col span="2"></Col>
    </Row>
  );
};

export default Exam;
