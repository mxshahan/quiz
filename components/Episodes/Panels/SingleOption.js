import React, { Fragment } from "react";
import { Checkbox, Radio } from "antd";
import { CheckCircleTwoTone, CloseCircleOutlined } from "@ant-design/icons";
import { SecStyled } from "./Styled";

const SingleOption = ({ answer_text, answerStatus, type }) => {
  const ans = answerStatus;
  return (
    <SecStyled ans={ans}>
      {ans === "correct" ? (
        <div>
          <label>
            <CheckCircleTwoTone twoToneColor="#52c41a" />{" "}
            <span
              style={{ padding: "0 0 0 7px" }}
              dangerouslySetInnerHTML={{ __html: answer_text }}
            />
          </label>
        </div>
      ) : ans === "incorrect" ? (
        <div>
          <label>
            <CloseCircleOutlined style={{ color: "red" }} />{" "}
            <span
              style={{ padding: "0 0 0 7px" }}
              dangerouslySetInnerHTML={{ __html: answer_text }}
            />
          </label>
        </div>
      ) : (
        <div>
          {type === "single" ? (
            <Radio name="answer" value={answer_text}>
              {answer_text}
            </Radio>
          ) : (
            <Checkbox>
              <span dangerouslySetInnerHTML={{ __html: answer_text }} />
            </Checkbox>
          )}
          {/* <Checkbox>  <span >{answer_text}</span> </Checkbox> */}
        </div>
      )}
      {/* <Checkbox> {answer_text} </Checkbox> */}
    </SecStyled>
  );
};
export default SingleOption;
