import "styled-components";
import styled from "styled-components";
import { Button, Alert, Card, Radio, Checkbox } from "antd";
import { Header } from "semantic-ui-react";

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
  background: white;
  border-radius: 5px;
  font-size: 15px;
  color: black;
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
  background: #080c23;
  border: 0px none;
`;

export const QuestionStyled = styled.div`
  margin-top: 5px;
  color: white;
  * {
    color: white;
  }
  img {
    max-width: 100%;
  }
  margin-bottom: 20px;
`;

export const QuestionNo = styled.small`
  border-bottom: 1px solid #ddd;
  display: block;
  padding-bottom: 5px;
  color: white;
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
  margin-left: 0px !important;
  margin: 15px;
  padding: 15px;
  border-radius: 3px;
  .ant-checkbox-inner {
    padding: 8px;
  }
  background-color: #141d52;
  color: white;
  display: flex;
  align-items: flex-start;
  .ant-checkbox {
    margin-top: 3px;
  }
  * {
    color: white;
  }
`;

export const AnswerPanelStyled = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;
