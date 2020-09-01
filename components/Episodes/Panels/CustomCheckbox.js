import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  CheckSquareFilled,
  CloseSquareFilled,
} from "@ant-design/icons";
import { Tag } from "antd";

const CustomCheckbox = ({
  checked,
  onChange,
  disabled,
  answerChecked,
  status,
  correctAnswer,
  index,
  type,
  ...props
}) => {
  const onClick = () => onChange(!checked);
  return (
    <CustomCheckboxStyled
      onClick={onClick}
      disabled={disabled && !status}
      status={status}
    >
      {status === "incorrect" ? (
        type === "multiple" ? (
          <CloseSquareFilled
            style={{ fontSize: 25, color: "#f1636f" }}
            fill="currentColor"
          />
        ) : (
          <CloseCircleFilled
            style={{ fontSize: 25, color: "#f1636f" }}
            fill="currentColor"
          />
        )
      ) : status === "correct" || checked ? (
        type === "multiple" ? (
          <CheckSquareFilled
            style={{ fontSize: 25, color: "#52c41a" }}
            fill="currentColor"
          />
        ) : (
          <CheckCircleFilled
            style={{ fontSize: 25, color: "#52c41a" }}
            fill="currentColor"
          />
        )
      ) : (
        <span
          className={
            type === "multiple" ? "checkbox-multiple" : "checkbox-single"
          }
        />
      )}
      {/* <CloseCircleOutlined /> */}
      <label style={{ marginLeft: 10 }}>{props.label}</label>
      {checked && answerChecked && (
        <Tag
          color={status === "correct" ? "#87d068" : "#f1636f"}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          Selected
        </Tag>
      )}
    </CustomCheckboxStyled>
  );
};

export default CustomCheckbox;

const CustomCheckboxStyled = styled.div`
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  position: relative;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-left: 0px !important;
  margin: 10px;
  padding: 15px;
  border-radius: 3px;
  border: ${(props) =>
    props.status === "incorrect"
      ? "2px solid #f1636f"
      : props.status === "correct"
      ? "2px solid #87d068"
      : "1px solid #87d068"};
  transition: 0.3s ease 0s;
  cursor: pointer;
  * {
    cursor: pointer;
  }
  &:hover {
    transform: scale(1.005);
    box-shadow: 0px 0px 13px 1px #ddd;
  }

  .checkbox-single {
    min-width: 25px;
    height: 25px;
    border-radius: 100%;
    border: 2px solid #999;
  }

  .checkbox-multiple {
    min-width: 25px;
    height: 25px;
    border-radius: 3px;
    border: 2px solid #999;
  }

  /* .checkbox {
    width: 25px;
    height: 25px;
    display: inline-block;
    margin: 10px;
    border-radius: 100%;
    position: relative;
    background: ${(
    props
  ) =>
    props.status === "correct"
      ? "#07c989"
      : props.status === "incorrect"
      ? "#f1636f"
      : props.status};
    border: ${(props) =>
    !props.status === "incorrect"
      ? "4px solid #f1636f"
      : ""};
    &:before {
    content: " ";
    height: 100%;
    width: 100%;
    border: 4px solid #07c989;
    border-radius: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  } 
    &:after {
      content: " ";
      height: 60%;
      width: 30%;
      border-bottom: 4px solid #ffffff;
      border-right: 4px solid #ffffff;
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    } */
  /* } */
`;
