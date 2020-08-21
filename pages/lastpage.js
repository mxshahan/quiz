import React, { useEffect } from "react";
import { Row, Col, Progress, Button } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { Container } from "semantic-ui-react";
import { useRouter } from "next/router";
import data from "../components/quiz.json";
import Link from "next/link";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const LastPage = ({ ...props }) => {
  const router = useRouter();

  const { score = 0, totalQuestion = 0 } = router.query;

  const percent = ((score / totalQuestion) * 100).toFixed(1);

  let message = "Congratulation";
  let description =
    "Let us know how you felt about this quiz. Did you like it? Do you think it needs improvement?";

  if (percent < 50) {
    message = "Ohh no...";
    description = "You are not pass. Try again next time";
  }

  const onUpVote = () => {
    alert("You have upvoted. Add api request in this function");
  };

  const onDownVote = () => {
    alert("You have downvoted. Add api request in this function");
  };

  const onNextQuiz = () => {
    alert("You have clicked next quiz. Add api request in this function");
  };

  useEffect(() => {
    window.document.body.style = "background: #031e40";
  });

  return (
    <div style={{}} id="lastPage">
      {percent > 50 && (
        <Confetti
          style={{
            backgroundColor: "transparent",
            border: "0px none",
            height: "100%",
          }}
          numberOfPieces={500}
        />
      )}
      <Col lg={12} style={{ margin: "50px auto" }}>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#031e40",
          }}
        >
          <Progress
            type="circle"
            strokeColor={percent < 50 ? "#ff0045" : "#64c51d"}
            percent={percent > 0 ? percent : 0}
            strokeWidth={10}
          />
          <h2
            style={{
              fontSize: "35px",
              color: "#fff",
              marginTop: 20,
              fontWeight: "bold",
            }}
          >
            {message}
          </h2>
          <p style={{ color: "#fff" }}>{description}</p>
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "50px",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ fontWeight: "bold", color: "#fff" }}>Whats Next?</h1>
          <ExtraQuote
            title="Rate This Quiz"
            description="Let us know how you felt about this quiz. Did you like it? Do you think it needs improvement?"
            right={
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    padding: "10px",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={onUpVote}
                >
                  <LikeOutlined style={{ fontSize: "20px" }} />
                </div>
                <div
                  onClick={onDownVote}
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                >
                  <DislikeOutlined style={{ fontSize: "20px" }} />
                </div>
              </div>
            }
          />

          <ExtraQuote
            title="Continue on with your course"
            description="Jump straight back to your next lesson bellow"
            backgroundColor="#1f6e40"
            style={{ padding: 5, color: "#fff" }}
            titleStyle={{ color: "white" }}
            bottom={
              <div
                style={{
                  width: "100%",
                  marginTop: 20,
                  backgroundColor: "#85f",
                  padding: 10,
                  borderRadius: 10,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src="https://lh3.googleusercontent.com/0bVs9-3xq573KI9u2hqZ86ARwltcoBv4RGOTI58Sw-xClAfl8dYdd9eYn2vf0D2HMA"
                  alt="Thumbs"
                  style={{
                    width: 100,
                  }}
                />
                <div
                  style={{
                    display: "inline-block",
                    marginLeft: 10,
                    textAlign: "left",
                  }}
                >
                  <p style={{ margin: 0 }}>Chapter 12.5</p>
                  <h3
                    style={{
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    New Title
                  </h3>
                  <p style={{ color: "#fff" }}>
                    You can use an URL object in the same way you can use it for
                    next/link. Works for both the url and as parameters:
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button onClick={onNextQuiz}>Next Quiz</Button>
                </div>
              </div>
            }
          />
          <ExtraQuote
            title="Rate This Quiz"
            description="You can use an URL object in the same way you can use it for next/link. Works for both the url and as parameters:"
            right={
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link
                  href={"/?totalQuestion=" + totalQuestion + "&score=" + score}
                >
                  <Button>Redo Quiz</Button>
                </Link>
              </div>
            }
          />
        </div>
      </Col>
    </div>
  );
};

export default LastPage;

const ExtraQuote = (props) => {
  return (
    <div
      style={{
        borderBottom: "1px solid grey",
        ...props.style,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "50px",
          paddingBottom: "10px",
        }}
      >
        <div style={{ textAlign: "left" }}>
          <h3
            style={{ fontWeight: "bold", color: "#fff", ...props.titleStyle }}
          >
            {props.title}
          </h3>
          <p style={{ color: "#999", ...props.descriptionStyle }}>
            {props.description}
          </p>
        </div>
        {props.right}
      </div>
      {props.bottom}
    </div>
  );
};
