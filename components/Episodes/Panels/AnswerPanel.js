import React from "react";
import SingleOption from "./SingleOption";
import { Radio, Checkbox } from "antd";
import { RadioStyled, CheckboxStyled, AnswerPanelStyled } from "./Styled";

const AnswerPanel = ({ type, answers, ...props }) => {
  console.log(answers);
  return (
    <AnswerPanelStyled>
      {Array.isArray(answers) &&
        answers.map((ans) => {
          const answer = JSON.parse(ans);
          return (
            <CheckboxStyled>
              <span
                dangerouslySetInnerHTML={{ __html: answer.answer_text }}
              ></span>
            </CheckboxStyled>
          );
        })}

      <CheckboxStyled>
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
        laying out print, graphic or web designs. The passage is attributed to
        an unknown typesetter in the
      </CheckboxStyled>
      <CheckboxStyled>
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
        laying out print, graphic or web designs. The passage is attributed to
        an unknown typesetter in the
      </CheckboxStyled>
    </AnswerPanelStyled>
  );
  // return (
  //   <AnswerPanelStyled>
  //     <Radio.Group onChange={props.onChange}>
  //       <RadioStyled value={1}>
  //         Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
  //         in laying out print, graphic or web designs. The passage is
  //         attributed to an unknown typesetter in the 15th century who is
  //         thought to have scrambled parts of Cicero's De Finibus Bonorum et
  //         Malorum for use in a type specimen book.
  //       </RadioStyled>
  //       <RadioStyled value={2}>This is answer</RadioStyled>{" "}
  //       <RadioStyled value={3}>This is answer</RadioStyled>{" "}
  //       <RadioStyled value={4}>This is answer</RadioStyled>
  //     </Radio.Group>
  //   </AnswerPanelStyled>
  // );
};

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

export default AnswerPanel;
