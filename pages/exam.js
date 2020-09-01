import React from "react";
import { Card, Row, Col, Typography, Checkbox, Button } from "antd";
import {
  Question,
  DivSpace,
  QuestionNumberList,
  Text,
  ExamBtnNo,
} from "../components/Episodes/Panels/exam.style";
import {
  FlagOutlined,
  LockOutlined,
  CaretRightOutlined,
  CaretLeftOutlined,
} from "@ant-design/icons";

const ExamPage = () => {
  const { Paragraph, Title } = Typography;
  return (
    <Row style={{ padding: "20px" }}>
      <Col span={14} style={{ paddingRight: "20px" }}>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Question no 1"
          extra={
            <div>
              <LockOutlined style={{ marginRight: "10px" }} />
              <FlagOutlined />
            </div>
          }
        >
          <Question>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum
          </Question>
          <DivSpace direction="vertical">
            <Checkbox style={{ margin: "10px" }}>Checkbox</Checkbox>
            <Checkbox style={{ margin: "10px" }}>Checkbox</Checkbox>
            <Checkbox style={{ margin: "10px" }}>Checkbox</Checkbox>
            <DivSpace direction="horizontal">
              <Button style={{ backgroundColor: "#00a6ff", color: "white" }}>
                Answer
              </Button>
              <Button>
                <FlagOutlined />
                Flag for Review
              </Button>
            </DivSpace>
          </DivSpace>
        </Card>
      </Col>
      <Col
        span={10}
        style={{ paddingLeft: "40px", marginTop: "16px", paddingRight: "40px" }}
      >
        <QuestionNumberList>
          <Text>NAVIGATE</Text>
          <ExamBtnNo type="primary"> 1 </ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <ExamBtnNo type="primary">1</ExamBtnNo>
          <Button
            type="primary"
            block
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            Submit Exam
          </Button>
          <h4>you have answered 12 Question</h4>
        </QuestionNumberList>
        <Button
          type="text"
          type="link"
          style={{ float: "right", marginTop: "20px" }}
        >
          Next
          <CaretRightOutlined />
        </Button>
        <Button type="text" type="link" style={{ marginTop: "20px" }}>
          <CaretLeftOutlined />
          Back
        </Button>
      </Col>
    </Row>
  );
};
export default ExamPage;
