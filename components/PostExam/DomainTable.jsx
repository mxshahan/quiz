import React from "react";
import TableRow from "./TableRow";
import { TableCard, TableTitle } from "./postExam.style";

export const DomainTable = () => {
  const data = [];
  for (let i = 0; i < 5; i++)
    data.push({
      leftText: "Lorem ipsum dolor sit amet.",
      percent: Math.floor(Math.random() * 100),
    });

  return (
    <TableCard>
      <TableTitle>Domain Breakdown</TableTitle>
      {data.map((item) => (
        <TableRow {...item} />
      ))}
    </TableCard>
  );
};
