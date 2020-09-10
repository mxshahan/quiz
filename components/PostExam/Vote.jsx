import React from "react";
import { LikeOutlined } from "@ant-design/icons";
import { VoteWrapper, StyledLikeOutlined } from "./postExam.style";

export const Vote = ({ text, upVote, downVote }) => (
  <VoteWrapper>
    <LikeOutlined onClick={upVote} style={{ cursor: "pointer" }} />
    <StyledLikeOutlined onClick={downVote} />
    <p>{text}</p>
  </VoteWrapper>
);
