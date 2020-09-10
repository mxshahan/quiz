import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
import { PostExamHeader } from "./PostExamHeader";
import { PostExamWrapper } from "./postExam.style";
import { QuickTips } from "./QuickTips";
import { DomainTable } from "./DomainTable";
import { SingleDomain } from "./SingleDomain";
import { useSelector } from "react-redux";

const PostExam = () => {
  const [domain, setDomain] = useState({});
  const [domainKey, setDomainKey] = useState([]);

  const { duration, allQuesitons, answeredQues } = useSelector(
    (store) => store.questions
  );

  useEffect(() => {
    const key = "domain";
    const groupedResult = allQuesitons.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
    setDomain(groupedResult);
    setDomainKey(Object.keys(groupedResult));
  }, [allQuesitons]);

  const calculatePercent = (item) => {
    const length = domain[item]?.length || 0;
    return (length * 100) / allQuesitons.length;
  };
  const canculateTotalScore = () => {
    const correctAns = [];
    allQuesitons.map((data) => {
      if (data.answered_ids.length !== data.correct_answer_ids.length)
        return false;
      const cA = data.answered_ids.slice().sort().join(",");
      const cB = data.correct_answer_ids.slice().sort().join(",");

      cA === cB && correctAns.push(true);
    });
    const ret = (correctAns.length * 100) / allQuesitons.length;
    return Number(ret || 0).toFixed(1);
  };
  return (
    <PostExamWrapper>
      <Row>
        <Col span="2"></Col>
        <Col span="20">
          <Card>
            <PostExamHeader
              total_score={canculateTotalScore()}
              total_question={allQuesitons.length}
              answered_question={answeredQues}
              total_time={duration}
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
              domainName={key}
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
