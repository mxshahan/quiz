import React, { useState } from "react";
import { Card, Row, Col } from "antd";
import {
  SingleDomainTitle,
  DomainProgess,
  ExamBtnNo,
  AnswerPanel,
  SelectedBtn,
  IconBox,
  ExamAnsBtnNo,
} from "./postExam.style";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Vote } from "./Vote";

export const SingleDomain = ({ percent, questions, domainName }) => {
  const [cntQues, setCntQues] = useState(questions[0]);
  const isCorrectBtn = (order) => {
    const data = questions.find((item) => parseInt(item.item_order) === order);
    if (data.answered_ids.length !== data.correct_answer_ids.length)
      return false;
    var cA = data.answered_ids.slice().sort().join(",");
    var cB = data.correct_answer_ids.slice().sort().join(",");

    return cA === cB;
  };
  const isCorrect = (idx) => {
    const flag = cntQues.correct_answer_ids.find(
      (item) => parseInt(item) === idx
    );
    if (flag !== undefined) return true;
    else return false;
  };
  const isSelected = (idx) => {
    const flag = cntQues.answered_ids.find((item) => parseInt(item) === idx);
    if (flag !== undefined) return true;
    else return false;
  };
  const handleNatigation = (idx) => {
    setCntQues(questions[idx]);
  };
  return (
    <Row gutter={[20, 20]}>
      <Col lg={10} md={24} sm={24} xs={24}>
        <Card>
          <div style={{ display: "flex", marginLeft: "-52px" }}>
            <DomainProgess
              strokeColor="#FE1575"
              strokeWidth="8"
              type="circle"
              percent={percent}
              width={90}
              strokeLinecap="square"
              trailColor="#E7ECF7"
            />
            <div>
              <SingleDomainTitle>Domain</SingleDomainTitle>
              <SingleDomainTitle
                color="#233252"
                size="30px"
                transform="capitalize"
              >
                {domainName}
              </SingleDomainTitle>
            </div>
          </div>
          <p style={{ margin: "25px 0", fontSize: "17px" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab incidunt
            animi eum enim vitae consectetur, amet tenetur dolore?
            Necessitatibus harum animi adipisci fugit, ipsum, officiis eius,
            minima quia voluptate sequi veniam iste ab veritatis nobis maxime
            doloremque aliquid repellat? Accusamus.
          </p>
          <SingleDomainTitle>Questions</SingleDomainTitle>
          {questions.map(({ item_order }, idx) => (
            <ExamAnsBtnNo
              type="primary"
              key={item_order}
              isCorrect={isCorrectBtn(item_order)}
              isActive={item_order === cntQues.item_order}
              onClick={() => handleNatigation(idx)}
            >
              {item_order + 1}
            </ExamAnsBtnNo>
          ))}
        </Card>
      </Col>
      <Col lg={14} md={24} sm={24} xs={24}>
        <Card>
          <SingleDomainTitle>
            Question {cntQues.item_order + 1}
          </SingleDomainTitle>
          <p>{cntQues.question_text}</p>
          <div>
            {cntQues.answers.map((item, idx) => (
              <AnswerPanel>
                <IconBox isSelected={isSelected(idx) || isCorrect(idx)}>
                  {isCorrect(idx) ? (
                    <CheckOutlined style={{ color: "#04E088" }} />
                  ) : (
                    <CloseOutlined style={{ color: "#FF1575" }} />
                  )}
                  <p style={{ marginLeft: "15px" }}>{item.answer_text}</p>
                </IconBox>
                {/* selected button */}
                {isSelected(idx) && (
                  <div>
                    <SelectedBtn correct={isCorrect(idx)}>Selected</SelectedBtn>
                  </div>
                )}
              </AnswerPanel>
            ))}
          </div>
          <SingleDomainTitle style={{ margin: "30px 0px 10px" }}>
            Explanation
          </SingleDomainTitle>
          <p>{cntQues.explanation}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "30px",
            }}
          >
            <Vote text={"Rate this Question"} />
          </div>
        </Card>
      </Col>
    </Row>
  );
};
