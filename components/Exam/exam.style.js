import styled from "styled-components";
import { Radio, Typography, Checkbox, Button, Space } from "antd";
import { FlagOutlined } from "@ant-design/icons";

export const DivSpace = styled(Space)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const QuestionNumberList = styled.div`
  background-color: white;
  // padding-left: 20px;
  // padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const Text = styled.h4`
  color: #fc7703;
  font-weight: bold;
  font-size: 15px;
`;
export const ExamBtnNo = styled(Button)`
  margin: 5px;
  background-color: ${({ isAnswered, isActive }) =>
    isActive ? "#427EFF" : isAnswered ? "#CFDFFF" : "#F3F5FB"};
  color: ${({ isActive }) => (isActive ? "#fff" : "#354569")};
  border-width: 0px;
  width: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  &:hover,
  &:focus {
    background-color: #427eff;
  }
`;
export const StyledFlagOutlined = styled(FlagOutlined)`
  margin-right: 5px;
  color: #233252 !important;
`;
export const RadioStyled = styled(Radio)`
  display: block;
  height: 40px;
  font-size: 16px;
  font-weight: 400;
`;
export const CheckboxStyled = styled(Checkbox)`
  height: 40px;
  font-size: 16px;
  font-weight: 400;
`;
export const Question = styled(Typography.Paragraph)`
  font-weight: 600;
  font-size: 17px;
`;
export const CardExtra = styled.div`
  height: 17px;
`;
