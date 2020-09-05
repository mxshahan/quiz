import React from "react";
import { Row, Col, Card } from "antd";
import { PostExamHeader } from "./PostExamHeader";
import { PostExamWrapper } from "./postExam.style";
import { QuickTips } from "./QuickTips";
import { DomainTable } from "./DomainTable";

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
        </Col>
        <Col span="2"></Col>
      </Row>
    </PostExamWrapper>
  );
};

export default PostExam;
