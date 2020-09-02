import styled from "styled-components";
import { Alert, Card, Radio } from "antd";
import { Header, Checkbox, Button } from "semantic-ui-react";

export const BtnStyled = styled(Button)`
  background: ${(props) => (props.color ? props.color : "#ff0045")} !important;
  border-radius: 5px;
  font-size: 15px;
  color: white !important;
  width: auto;
`;

// New style
export const SectionStyled = styled.section`
  background-color: #efefef;
  padding-top: 50px;
`;

export const CardStyled = styled(Card)`
  margin: 20px;
  box-shadow: 0px 0px 10px 1px #aaa;
  border-radius: 5px;
  background: #fff;
  border: 0px none;
`;

export const QuestionStyled = styled.div`
  margin-top: 5px;
  img {
    max-width: 100%;
  }
  margin-bottom: 20px;
`;

export const QuestionNo = styled.small`
  border-bottom: 1px solid #ddd;
  display: block;
  padding-bottom: 5px;
  /* color: white; */
`;

export const RadioStyled = styled(Radio)`
  display: block;
  margin-left: 0px !important;
  margin: 15px;
  padding: 15px;
  border-radius: 3px;
  .ant-radio-input {
    padding: 8px;
  }
  background-color: #141d52;
  color: white;
  display: flex;
  align-items: flex-start;
  .ant-radio {
    margin-top: 3px;
  }
`;

export const CheckboxStyled = styled(Checkbox)`
  display: block;
  width: 100%;
  margin-left: 0px !important;
  margin: 5px;
  padding: 15px;
  border-radius: 3px;
  border: 1px solid #87d068;
  transition: 0.3s ease 0s;
  &:hover {
    transform: scale(1.005);
    box-shadow: 0px 0px 13px 1px #ddd;
  }

  ${(props) =>
    props.status === "correct"
      ? `label { 
          &:after {
        background: red !important;
        color: white !important;
        transform: scale(0.666) !important;
        opacity: 1;
      }
  }`
      : props.status === "incorrect"
      ? `label { &:after {
          background: red !important;
          color: white !important;
          transform: scale(0.666) !important;
          opacity: 1;
      }
  }`
      : ``}
`;

export const AnswerPanelStyled = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const AlertStyled = styled(Alert)`
  margin-bottom: 10px;
`;
