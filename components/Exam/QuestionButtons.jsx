import React, { useState } from "react";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Text, ExamBtnNo } from "./exam.style";
import { Badge, Col, Button, Card } from "antd";
import { useRouter } from "next/router";
import { ExamBtnWrapper } from "../PostExam/postExam.style";

const QuestionButtons = ({
  questions,
  handleNatigation,
  markedQues,
  answeredQues,
  currentQuestion,
  setShow,
}) => {
  const isMarked = (item_order) => {
    const data = markedQues.find((item) => item === item_order);
    if (data === undefined) return false;
    else return true;
  };
  const isAnswered = (item_order) => {
    const data = answeredQues.find((item) => item.item_order === item_order);
    if (data === undefined) return false;
    else return true;
  };
  const isActive = (item_order) => currentQuestion.item_order === item_order;
  const route = useRouter();
  return (
    <Col lg={8} md={20} sm={20} xs={20}>
      <Card>
        <Text>NAVIGATE</Text>
        <ExamBtnWrapper>
          {Array.isArray(questions) &&
            questions.map((item, idx) => (
              <Badge dot={isMarked(item.item_order)} offset={[-5, 5]}>
                <ExamBtnNo
                  type="primary"
                  key={item.item_order}
                  isAnswered={isAnswered(item.item_order)}
                  isActive={isActive(item.item_order)}
                  onClick={() => handleNatigation(item.item_order)}
                >
                  {idx + 1}
                </ExamBtnNo>
              </Badge>
            ))}
        </ExamBtnWrapper>
        <Button
          type="primary"
          block
          style={{ marginTop: "20px", marginBottom: "20px" }}
          onClick={() => setShow(true)}
        >
          Submit Exam
        </Button>
        <h4>you have answered {answeredQues.length} Question</h4>
      </Card>
      <Button
        type="text"
        type="link"
        style={{ float: "right", marginTop: "20px" }}
        disabled={currentQuestion.item_order + 1 === questions.length}
        onClick={() => handleNatigation(currentQuestion.item_order + 1)}
      >
        Next
        <CaretRightOutlined />
      </Button>
      <Button
        type="text"
        type="link"
        style={{ marginTop: "20px" }}
        disabled={currentQuestion.item_order - 1 < 0}
        onClick={() => handleNatigation(currentQuestion.item_order - 1)}
      >
        <CaretLeftOutlined />
        Back
      </Button>
    </Col>
  );
};

export default QuestionButtons;
