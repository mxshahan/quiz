import React from "react";
import { StyledTableRow } from "./postExam.style";
import { Progress } from "antd";

const TableRow = ({ leftText, percent }) => {
  return (
    <StyledTableRow>
      <h2 style={{ textTransform: "capitalize" }}>{leftText}</h2>
      <Progress
        percent={parseFloat(percent).toFixed(1)}
        strokeWidth={20}
        strokeColor={"#FD8A16"}
        strokeLinecap="square"
      />
    </StyledTableRow>
  );
};

export default TableRow;
