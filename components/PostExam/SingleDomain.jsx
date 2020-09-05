import React, { useState } from "react";
import { Card, Row, Col } from "antd";
import { SingleDomainTitle, DomainProgess, ExamBtnNo } from "./postExam.style";
import { questions } from "./data.json";
import { Button } from "semantic-ui-react";
import { CheckOutlined } from "@ant-design/icons";
import { Vote } from "./Vote";

export const SingleDomain = () => {
  const [cntQues, setCntQues] = useState(questions[0]);
  const data = [];
  for (let i = 0; i < 15; i++) data.push(i);
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
              percent={30}
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
                Define Performance Architectures
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
          {data.map((item) => (
            <ExamBtnNo
              type="primary"
              key={item}
              onClick={() => handleNatigation(item)}
            >
              {item + 1}
            </ExamBtnNo>
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
            {cntQues.answers.map((item) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CheckOutlined style={{ color: "#04E088" }} />
                  <p style={{ marginLeft: "15px" }}>{item.answer_text}</p>
                </div>
                {/* selected button */}
                <div>
                  <Button
                    style={{ color: "#04E088", background: "#f2f3f5 none" }}
                  >
                    Selected
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div style={{display:"flex", justifyContent:"flex-end", marginTop: "30px"}}>
            <Vote text={"Rate this Question"}/>
          </div>
        </Card>
      </Col>
    </Row>
  );
};
