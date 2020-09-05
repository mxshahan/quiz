import React from "react";
import { HeaderWrapper, Title, HeaderVote } from "./postExam.style";
import { Vote } from "./Vote";

export const PostExamHeader = () => {
  return (
    <>
      <HeaderWrapper content="57%">
        <Title>You scored 57%</Title>
        <p>You answered 35 of 65 questions correctly in 01:04:44</p>
      </HeaderWrapper>
      <HeaderVote>
        <Vote text={"Rate this practice exam"} />
      </HeaderVote>
    </>
  );
};
