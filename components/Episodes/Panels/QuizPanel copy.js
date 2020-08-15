import React, { memo } from "react";
import { Button, Form, Header, Icon, Popup, Progress } from "semantic-ui-react";
import Skeleton from "react-loading-skeleton";
import { CircularProgressbar } from "react-circular-progressbar";
import renderHTML from "react-render-html";

const MultiOption = ({
  answer_text,
  selected_values,
  selectedAnswerIds,
  correctAnswerIds,
  idx,
  answerStatus,
  loadingAnswer,
  questionOrder,
  handleChange,
}) => {
  return (
    <>
      {loadingAnswer === true ? (
        <Skeleton />
      ) : (
        <Form.Checkbox
          style={
            answerStatus === "correct" && correctAnswerIds.includes(idx)
              ? { backgroundColor: "lightgreen" }
              : answerStatus === "incorrect" && selectedAnswerIds.includes(idx)
              ? { backgroundColor: "lightcoral" }
              : {}
          }
          label={renderHTML(`<label>${answer_text}</label>`)}
          value={idx}
          checked={selected_values.includes(idx)}
          onChange={handleChange}
          name={`question_${questionOrder}_${idx}`}
        />
      )}
    </>
  );
};

const SingleOption = ({
  answer_text,
  selected_values,
  selectedAnswerIds,
  correctAnswerIds,
  idx,
  loadingAnswer,
  answerStatus,
  handleChange,
  questionOrder,
}) => {
  return (
    <>
      {loadingAnswer === true ? (
        <div style={{ display: "flex" }}>
          <Skeleton style={{ color: "#000", flex: "1" }} circle width={8} />
          <span style={{ color: "#999", width: "1rem" }}> </span>
          <Skeleton style={{ flex: "1" }} width={50} />
        </div>
      ) : (
        <Form.Radio
          style={
            answerStatus === "correct" && correctAnswerIds[0] === parseInt(idx)
              ? { backgroundColor: "lightgreen" }
              : answerStatus === "incorrect" && selectedAnswerIds[0] === idx
              ? { backgroundColor: "lightcoral" }
              : {}
          }
          label={renderHTML(`<label>${answer_text}</label>`)}
          value={idx}
          checked={selected_values[0] === idx}
          onChange={handleChange}
          name={`question_${questionOrder}`}
        />
      )}
    </>
  );
};

const QuizPanel = ({
  selected_values,
  correctAnswerIds,
  gotoQuestion,
  submitAnswer,
  answerStatus,
  percentAnswered,
  loadingAnswer,
  score,
  nextQuestion,
  finishQuiz,
  resetQuiz,
  closeQuiz,
  handleChange,
  module_id,
  locale,
  course,
  episode_id,
  quiz_id,
  questionOrder,
  episode,
  selectedAnswerIds,
}) => {
  // const module = _.find(course.Modules, module => module.Quiz && module.Quiz.id === quiz_id);
  const enabledQuestions = episode.quiz.questions.filter((q) => !q.disabled);
  const question = enabledQuestions[questionOrder];
  const { num_expected_answers } = question;
  const isLastQuestion = episode.quiz.questions.length === questionOrder + 1;
  if (typeof question === "undefined") {
    closeQuiz({ module_id, episode_id, quiz_id: episode.quiz.id });
    return null;
  }

  return (
    <div
      style={{
        position: "relative",
        overflow: "auto",
        height: "100vh",
        backgroundColor: "darkslategrey",
      }}
    >
      <div
        className={"quiz-close"}
        onClick={() =>
          closeQuiz({ module_id, episode_id, quiz_id: episode.quiz.id })
        }
      >
        <Popup
          trigger={
            <svg viewBox="0 0 24 24">
              <g>
                <polygon points="20.707,4.707 19.293,3.293 12,10.586 4.707,3.293 3.293,4.707 10.586,12 3.293,19.293  4.707,20.707 12,13.414 19.293,20.707 20.707,19.293 13.414,12 "></polygon>
              </g>
            </svg>
          }
          content="Exit the course"
          position={"right center"}
          inverted
        />
      </div>
      <Form
        className={"quiz-panel"}
        onSubmit={() =>
          answerStatus === "unanswered"
            ? submitAnswer({ module_id, episode_id, questionOrder })
            : isLastQuestion
            ? finishQuiz()
            : nextQuestion(episode.id, "next")
        }
      >
        <div style={{ width: "100px", margin: "auto" }}>
          <CircularProgressbar
            percentage={score || 0}
            text={`${score || 0}%`}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Icon
            disabled={questionOrder === 0}
            onClick={() => gotoQuestion({ direction: "prev" })}
            link
            name={"chevron left"}
          />
          Question {questionOrder + 1} of {enabledQuestions.length}
          <Icon
            disabled={isLastQuestion}
            onClick={() => gotoQuestion({ direction: "next" })}
            link
            name={"chevron right"}
          />
        </div>
        <Progress
          percent={((questionOrder + 1) / enabledQuestions.length) * 100}
          indicating
          inverted
          color="teal"
        />
        <Header as="h3">
          {renderHTML(question[`question_text` /*`question_text_${locale}`*/])}
        </Header>
        {num_expected_answers > 1 && (
          <Header as="h4">{`select ${num_expected_answers}`}</Header>
        )}
        <Form.Group grouped>
          {question[`answers` /*`answers_${locale}`*/]
            .filter((a) => JSON.parse(a).disabled === false)
            .map((answer, idx) => {
              const { answer_text } = JSON.parse(answer);
              return num_expected_answers === 1 ? (
                <SingleOption
                  {...{
                    answer_text,
                    selected_values,
                    selectedAnswerIds,
                    correctAnswerIds,
                    idx,
                    answerStatus,
                    loadingAnswer,
                    questionOrder,
                    handleChange,
                  }}
                />
              ) : (
                <MultiOption
                  {...{
                    answer_text,
                    selected_values,
                    selectedAnswerIds,
                    correctAnswerIds,
                    idx,
                    answerStatus,
                    loadingAnswer,
                    questionOrder,
                    handleChange,
                  }}
                />
              );
            })}
        </Form.Group>
        {answerStatus === "correct" ? (
          <div>Good job!</div>
        ) : answerStatus === "incorrect" ? (
          <div className={"explanation-panel"}>
            Sorry, your answer was incorrect.{" "}
            {renderHTML(question[`explanation` /*`explanation_${locale}`]*/])}
          </div>
        ) : (
          ""
        )}
        <Button positive style={{ width: "100%" }}>
          {answerStatus === "unanswered"
            ? "Submit"
            : isLastQuestion
            ? "Finish quiz"
            : "Next question"}
        </Button>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Form.Field
            as={"a"}
            style={{ color: "#4183c4", cursor: "pointer" }}
            onClick={(e) => {
              resetQuiz({ quiz_id: e.currentTarget.id });
            }}
            id={`${episode.quiz.id}`}
          >
            start over
          </Form.Field>
        </div>
      </Form>
    </div>
  );
};

export default memo(QuizPanel);
