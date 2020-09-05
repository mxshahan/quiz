import style from "styled-components";
import styled from "styled-components";
import { LikeOutlined } from "@ant-design/icons";
import { Vote } from "./Vote";
import { Card, Progress, Button } from "antd";

export const StyledTableRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e7ecf7;
  padding-bottom: 15px;
  margin-bottom: 15px;
  h2 {
    font-size: 18px;
    color: #233252;
    margin-bottom: 0;
  }
  p {
    font-size: 18px;
    color: #233252;
  }
  .ant-progress-line {
    width: 230px;
    .ant-progress-inner {
      border-radius: 5px;
      width: 88%;
    }
    .ant-progress-text {
      color: black;
    }
  }
`;
export const VoteWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;
export const StyledLikeOutlined = styled(LikeOutlined)`
  transform: rotate(-180deg);
  margin: 0px 10px;
`;
export const HeaderVote = styled.div`
  display: flex;
  justify-content: center;
`;
export const QuickTipTitle = styled.h2`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
  color: #fd8a16;
  margin-bottom: 0;
  padding: 30px 0;
  position: relative;
  &::after {
    position: absolute;
    content: "";
    width: 92%;
    height: 1px;
    background: #efe9e9;
    top: 50%;
    right: 0;
  }
`;
export const PostExamWrapper = styled.div`
  padding: 20px 0;
  p {
    color: black;
    font-size: 15px;
  }
`;
export const HeaderWrapper = styled.div`
  text-align: center;
  padding: 60px;
  position: relative;
  transform-style: preserve-3d;
  &::after {
    position: absolute;
    content: ${({ content }) => `"${content ? content : "Click"}"`};
    top: 47%;
    left: 51%;
    transform: translateZ(-1px) translate(-50%, -50%);
    font-size: 185px;
    font-weight: 700;
    color: #f4f4f4;
  }
`;

export const Title = styled.h2`
  font-size: 38px;
  font-weight: 600;
`;
export const TableTitle = styled.h2`
  color: #fd8a16;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 30px;
`;
export const TableCard = styled(Card)`
  margin: 40px 0;
`;
export const SingleDomainTitle = styled.h2`
  color: ${({ color }) => (color ? color : "#fd8a16")};
  font-weight: 700;
  font-size: ${({ size }) => (size ? size : "17px")};
  text-transform: ${({ transform }) => (transform ? transform : "uppercase")}; ;
`;
export const DomainProgess = styled(Progress)`
  margin-right: 20px;
  .ant-progress-inner::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    border-radius: 50%;
    background: #fff;
    z-index: -1;
  }
`;

export const ExamBtnNo = styled(Button)`
  margin: 5px;
  background-color: ${({ isAnswered, isActive }) =>
    isActive ? "#FF1575" : isAnswered ? "#CFDFFF" : "#C0F7E1"};
  color: ${({ isActive }) => (isActive ? "#fff" : "#354569")};
  border-width: 0px;
  width: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  &:hover,
  &:focus {
    background-color: #FF1575;
  }
`;
