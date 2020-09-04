import React, { useState } from "react";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Text, QuestionNumberList, ExamBtnNo } from "./exam.style";
import { Badge, Col, Button } from "antd";
import Modal from "antd/lib/modal/Modal";

const QuestionButtons = ({
  questions,
  handleNatigation,
  markedQues,
  answeredQues,
  currentQuestion,
}) => {
  const [show, setShow] = useState(false);
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
  return (
    <>
      <Modal
        title="Ready to submit exam?"
        visible={show}
        // onOk={this.handleOk}
        onCancel={() => setShow(false)}
        cancelText="Continue exam"
        okText="Submit exam"
      >
        <p>Are you ready to submit exam?</p>
        <p>You have {markedQues.length} flagged questions</p>
        <p>
          You have {questions.length - answeredQues.length} unanswered question
        </p>
      </Modal>
      <Col
        span={10}
        style={{ paddingLeft: "40px", marginTop: "16px", paddingRight: "40px" }}
      >
        <QuestionNumberList>
          <Text>NAVIGATE</Text>
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
          <Button
            type="primary"
            block
            style={{ marginTop: "20px", marginBottom: "20px" }}
            onClick={() => setShow(true)}
          >
            Submit Exam
          </Button>
          <h4>you have answered {answeredQues.length} Question</h4>
        </QuestionNumberList>
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
    </>
  );
};

export default QuestionButtons;
