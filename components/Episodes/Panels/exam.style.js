import styled from "styled-components";

import { Typography, Space, Button } from "antd";

export const Question = styled(Typography.Paragraph)`
  font-weight: bold;
  font-size: 17px;
`;

export const DivSpace = styled(Space)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const QuestionNumberList = styled.div`
  background-color: white;
  padding-left: 20px;
  padding-right: 20px;
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
  background-color: transparent;
  color: black;
`;
