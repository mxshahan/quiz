import "styled-components";
import styled from "styled-components";
import { Alert, Card, Radio } from "antd";
import { Header, Checkbox, Button } from "semantic-ui-react";

export const SecStyled = styled.section`
  width: 100%;
  margin: 4px;
  padding: 7px;
  margin-left: 0px;
  overflow: hidden;
  border: ${(props) =>
    props.ans === "correct"
      ? "2px solid #66DC90"
      : props.ans === "incorrect"
      ? "2px solid #A22153"
      : "2px solid transparent"};
  background: ${(props) =>
    props.ans === "correct"
      ? " #235451"
      : props.ans === "incorrect"
      ? " rgba(248,85,92,0.3)"
      : "#1E1D56"};
  border-radius: 5px;
  div {
    label {
      span {
        /* padding:8px ; */
      }
    }
  }

  label {
    color: white;
    padding: 8px;
    font-size: 15px;
    display: block;
  }
`;
export const BtnStyled = styled(Button)`
  background: #ff0045 !important;
  border-radius: 5px;
  font-size: 15px;
  color: white !important;
  width: auto;
`;
export const AlertStyled = styled(Alert)`
  margin-bottom: 10px;
`;
export const HeaderStyled = styled(Header)`
  img {
    width: 100%;
  }
`;

// New style
export const SectionStyled = styled.section`
  background-color: #efefef;
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
  /* color: white;
  * {
    color: white;
  } */
  img {
    max-width: 100%;
  }
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
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
