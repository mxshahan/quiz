import React from "react";
import { Row, Col, Card } from "antd";
import { PostExamHeader } from "./PostExamHeader";
import { PostExamWrapper } from "./postExam.style";
import { QuickTips } from "./QuickTips";
import { DomainTable } from "./DomainTable";
import { SingleDomain } from "./SingleDomain";

const PostExam = () => {
  return (
    <PostExamWrapper>
      <Row>
        <Col span="2"></Col>
        <Col span="20">
          <Card>
            <PostExamHeader />
            <QuickTips />
          </Card>
          <DomainTable />
          <SingleDomain />
        </Col>
        <Col span="2"></Col>
      </Row>
    </PostExamWrapper>
  );
};

export default PostExam;
