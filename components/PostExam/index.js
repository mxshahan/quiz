import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
import { PostExamHeader } from "./PostExamHeader";
import { PostExamWrapper } from "./postExam.style";
import { QuickTips } from "./QuickTips";
import { DomainTable } from "./DomainTable";
import { SingleDomain } from "./SingleDomain";
import {
  questions,
  total_score,
  answered_question,
  total_question,
  total_time,
} from "./data.json";

const PostExam = () => {
  const [domain, setDomain] = useState({});
  const [domainKey, setDomainKey] = useState([]);
  useEffect(() => {
    const key = "domain";
    const groupedResult = questions.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
    setDomain(groupedResult);
    setDomainKey(Object.keys(groupedResult));
  }, [questions]);
  const calculatePercent = (item) => {
    const length = domain[item]?.length || 0;
    return (length * 100) / total_question;
  };
  console.log({ questions, domain, domainKey });
  return (
    <PostExamWrapper>
      <Row>
        <Col span="2"></Col>
        <Col span="20">
          <Card>
            <PostExamHeader
              total_score={total_score}
              total_question={total_question}
              answered_question={answered_question}
              total_time={total_time}
            />
            <QuickTips />
          </Card>
          <DomainTable
            calculatePercent={calculatePercent}
            domainKey={domainKey}
          />
          {domainKey.map((key) => (
            <SingleDomain
              key={key}
              percent={calculatePercent(key)}
              questions={domain[key]}
            />
          ))}
        </Col>
        <Col span="2"></Col>
      </Row>
    </PostExamWrapper>
  );
};

export default PostExam;
