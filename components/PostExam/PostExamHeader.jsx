import React, { useState, useEffect } from "react";
import { HeaderWrapper, Title, HeaderVote } from "./postExam.style";
import { Vote } from "./Vote";

export const PostExamHeader = ({
  total_score,
  total_question,
  answered_question,
  total_time,
}) => {
  const [key, setKey] = useState(Date.now());
  useEffect(() => {
    setKey(Date.now());
  }, [total_score]);
  return (
    <>
      <HeaderWrapper content={total_score + "%"} key={key}>
        <Title>You scored {total_score}%</Title>
        <p>
          You answered {answered_question} of {total_question} questions
          correctly in {total_time}
        </p>
      </HeaderWrapper>
      <HeaderVote>
        <Vote text={"Rate this practice exam"} />
      </HeaderVote>
    </>
  );
};
