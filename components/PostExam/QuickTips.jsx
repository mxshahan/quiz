import React from "react";
import { QuickTipTitle } from "./postExam.style";
import { QuickTipItem } from "./QuickTipItem";
import { Row } from "antd";

export const QuickTips = () => (
  <>
    <QuickTipTitle>Quick tips</QuickTipTitle>
    <Row>
      <QuickTipItem
        icon="/tips-1.PNG"
        title="You finished early"
        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut voluptatem porro assumenda repudiandae labore ipsum tenetur in facilis neque saepe."
      />
      <QuickTipItem
        icon="/tips-2.PNG"
        title="Keep studying!"
        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut voluptatem porro assumenda repudiandae labore ipsum tenetur in facilis neque saepe."
      />
    </Row>
  </>
);
