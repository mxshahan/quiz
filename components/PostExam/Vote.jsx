import React from "react";
import { LikeOutlined } from "@ant-design/icons";
import { VoteWrapper, StyledLikeOutlined } from "./postExam.style";

export const Vote = ({ text }) => (
  <VoteWrapper>
    <LikeOutlined />
    <StyledLikeOutlined />
    <p>{text}</p>
  </VoteWrapper>
);
