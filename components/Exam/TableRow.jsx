import React from "react";
import { StyledTableRow } from "./preExam.style";

const TableRow = ({ leftText, rightText, isTableHeader }) => {
  return (
    <StyledTableRow isTableHeader={isTableHeader}>
      <h2>{leftText}</h2>
      <p>{rightText}</p>
    </StyledTableRow>
  );
};

export default TableRow;
