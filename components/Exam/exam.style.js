import styled from "styled-components";
import { Radio, Typography, Checkbox, Button, Space } from "antd";
import { FlagOutlined, CheckOutlined } from "@ant-design/icons";

export const DivSpace = styled(Space)`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
`;

export const Answer = styled.div`
  margin: 10px 0;
  padding: 15px;
  border-radius: 3px;
  border: 1px solid #87d068;
  transition: 0.3s ease 0s;
  &:hover {
    transform: scale(1.005);
    box-shadow: 0px 0px 13px 1px #ddd;
  }
`;
export const QuestionNumberList = styled.div`
  background-color: white;
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
  font-size: 16px;
  font-weight: 400;
  .ant-radio:hover .ant-radio-inner{
    border-color: #999;
  }
  .ant-radio-checked .ant-radio-inner {
      background: #52C41A;
      border-color: #52C41A;
      &::after {
      position: absolute;
      display: table;
      border: 2px solid #fff;
      border-top: 0;
      border-left: 0;
      transform: rotate(45deg) scale(1) translate(-50%, -50%);
      opacity: 1;
      transition: all 0s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
      content: " ";
      border-radius: 0px;
      width: 6.5px;
      height: 14px;
      background: #52C41A;
      top: 10px;
      left: 5px;
    }
  }
  .ant-radio-inner {
    border: 2px solid #999;
    width: 25px;
    height: 25px;
    }
  }
`;
export const CheckboxStyled = styled(Checkbox)`
  font-size: 16px;
  font-weight: 400;
  display: flex;
  align-items: center;
  &:hover .ant-checkbox-inner,
  &:hover .ant-checkbox-checked::after {
    border-color: #999;
  }
  .ant-checkbox-disabled .ant-checkbox-inner {
    // border-color: #99999959;
    opacity: 0.5;
  }
  .ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: #fff !important;
    top: 10px;
    left: 5px;
  }
  .ant-checkbox-inner {
    width: 25px;
    height: 25px;
    border: ${({ checked }) =>
      checked ? "2px solid #52C41A !important" : "2px solid #999 !important"};
    background-color: ${({ checked }) => (checked ? "#52C41A" : "#fff")};
    &:after {
      width: 6.5px;
      height: 14px;
    }
  }
`;
export const Question = styled(Typography.Paragraph)`
  font-weight: 600;
  font-size: 17px;
`;
export const CardExtra = styled.div`
  height: 17px;
`;
