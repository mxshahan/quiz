import React from "react";
import { Row, Col } from "antd";
import {
  PreExamHeader,
  PreExamBody,
  PreExamTitle,
  TitleLeft,
  PreExamDesc,
  PreExamMiniTitle,
  BtnStyled,
} from "./preExam.style";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";
import TableRow from "./TableRow";
import { useRouter } from "next/router";

const PreExam = () => {
  const history = useRouter();
  const rows = [
    { leftText: "Domain", rightText: "Percentage" },
    { leftText: "Design Resilient Architectures", rightText: "30%" },
    { leftText: "Define Performance Architectures", rightText: "28%" },
    {
      leftText: "Specify Secure Applications and Architectures",
      rightText: "24%",
    },
    { leftText: "Design Cost-optimized Achitectures", rightText: "18%" },
  ];
  const handleRoute = () => history.push("/exam");
  return (
    <Row>
      <Col span="2"></Col>
      <Col span="20">
        <PreExamHeader>
          <img src="/pre-exam-logo.PNG" alt="pre-exam-logo" />
          <Link href="/">
            <span>
              Back to Dashboard <ArrowRightOutlined />
            </span>
          </Link>
        </PreExamHeader>
        <PreExamBody>
          <PreExamTitle>
            <TitleLeft>
              <img src="/pre-exam-title-logo.png" alt="logo" />
              <h2>Practice exam</h2>
              <p>AWS Certified Solutions Architect - Associate Exam</p>
            </TitleLeft>
            <p>
              2 hours 15 minutes <br /> 65 questions
            </p>
          </PreExamTitle>
          <PreExamDesc>
            The AWS Certified Solutions Architect - Associate (SAA-CO2)
            examination is intended for individuals who perform a Solutions
            Architect role. This exam validates an examinee's ability to
            effectively demonstrate knowledge of how to architect and deploy
            secure and robust applications on AWS technologies.
          </PreExamDesc>
          <PreExamMiniTitle>domain breackdown</PreExamMiniTitle>
          {rows.map(({ leftText, rightText }, idx) => (
            <TableRow
              isTableHeader={idx === 0}
              leftText={leftText}
              rightText={rightText}
            />
          ))}

          <PreExamMiniTitle style={{ paddingTop: "10px" }}>
            attempted history
          </PreExamMiniTitle>
          <p style={{ fontWeight: "unset" }}>
            You haven't attempted this exam yet.
          </p>
          <BtnStyled onClick={handleRoute}>Start Practice Exam</BtnStyled>
        </PreExamBody>
      </Col>
      <Col span="2"></Col>
    </Row>
  );
};

export default PreExam;
