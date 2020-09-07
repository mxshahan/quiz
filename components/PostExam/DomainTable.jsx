import React from "react";
import TableRow from "./TableRow";
import { TableCard, TableTitle } from "./postExam.style";

export const DomainTable = ({ calculatePercent, domainKey }) => {
  return (
    <TableCard>
      <TableTitle>Domain Breakdown</TableTitle>
      {domainKey.map((item) => (
        <TableRow percent={calculatePercent(item)} leftText={item} key={item} />
      ))}
    </TableCard>
  );
};
