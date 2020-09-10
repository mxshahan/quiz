import React from "react";
import Modal from "antd/lib/modal/Modal";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { submitExam } from "../../store/actions/questions";

const ExamSubmitModal = ({
  show,
  setShow,
  markedQues,
  questions,
  answeredQues,
}) => {
  const route = useRouter();
  const dispatch = useDispatch();
  const startTime = Date.now();
  const handleSubmit = () => {
    const duration = msToTime(Date.now() - startTime);
    const allQuesitons = questions.map((item) => {
      const ans = answeredQues.find(
        (innerItem) => innerItem.item_order === item.item_order
      );
      if (ans === undefined) item.answered_ids = [];
      else item.answered_ids = ans.answered_ids;
      return item;
    });
    const payload = {
      duration,
      allQuesitons,
      answeredQues: answeredQues.length,
    };
    dispatch(submitExam(payload));
    route.push("/post-exam");
  };

  const msToTime = (duration) => {
    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  };

  return (
    <Modal
      title="Ready to submit exam?"
      visible={show}
      onOk={handleSubmit}
      onCancel={() => setShow(false)}
      cancelText="Continue exam"
      okText="Submit exam"
    >
      <p>Are you ready to submit exam?</p>
      <p>You have {markedQues.length} flagged questions</p>
      <p>
        You have {questions.length - answeredQues.length} unanswered question
      </p>
    </Modal>
  );
};
export default ExamSubmitModal;
