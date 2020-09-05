import React from "react";
import { Row, Col } from "antd";

export const QuickTipItem = ({ icon, title, text }) => (
  <Col span="7">
    <div style={{ display: "flex" }}>
      <div style={{marginRight: "10px"}}>
        <img src={icon} alt="icon" />
      </div>
      <div>
        <p>
          <b>{title}</b>
        </p>
        <p>{text}</p>
      </div>
    </div>
  </Col>
);
