import React, { useEffect } from "react";
import { Row, Col, Progress, Button } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { Container } from "semantic-ui-react";
import { useRouter } from "next/router";
import data from "../components/quiz.json";
import Link from "next/link";

const LastPage = ({...props}) => {
  const router = useRouter();

  const { score = 0, totalQuestion = 0 } = router.query;

  const percent = ((score / totalQuestion) * 100).toFixed(1);

  let message = "Congratulation";
  let description =
    "dfkjdkf lskdf kd fkd dfjkdf ldkf dkfkdf ddskfjdf duh uf duf f fuf dfudf udf d fo uiuhui h ih guduh uf duf f fuf dfudf udf d fo uiuhui h ih gu";

  if (percent < 50) {
    message = "Ohh no...";
    description = "You are not pass. Try again next time";
  }

  useEffect(() => {
    window.document.body.style = "background: white";
  });


  return (
    <div style={{}} id="lastPage">
      <Row>
        <Col lg={12}>
          <div
            style={{
              textAlign: "center",
              backgroundColor: "#031e40",
              height: "100vh",
              position: "fixed",
              left: 0,
              width: "40%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              padding: 30,
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
        </Col>
        <Col lg={10}>
          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "30px",
            }}
          >
            <h1 style={{ fontWeight: "bold", color: "#111" }}>Whats Next?</h1>
            <ExtraQuote
              title="Rate This Quiz"
              description="You can use an URL object in the same way you can use it for next/link. Works for both the url and as parameters:"
              right={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      padding: "10px",
                      marginRight: "10px",
                    }}
                  >
                    <LikeOutlined style={{ fontSize: "20px" }} />
                  </div>
                  <div
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      padding: "10px",
                    }}
                  >
                    <DislikeOutlined style={{ fontSize: "20px" }} />
                  </div>
                </div>
              }
            />
            <ExtraQuote
              title="Rate This Quiz"
              description="You can use an URL object in the same way you can use it for next/link. Works for both the url and as parameters:"
            />
            <ExtraQuote
              title="Rate This Quiz"
              description="You can use an URL object in the same way you can use it for next/link. Works for both the url and as parameters:"
              right={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button>Next Quiz</Button>
                </div>
              }
              backgroundColor="#031e40"
              style={{ padding: 5, color: "#fff" }}
              titleStyle={{ color: "white" }}
              descriptionStyle={{ color: "white" }}
            />
            <ExtraQuote
              title="Rate This Quiz"
              description="You can use an URL object in the same way you can use it for next/link. Works for both the url and as parameters:"
              right={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Link href="/"><Button>Redo Quiz</Button></Link>
                </div>
              }
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LastPage;

const ExtraQuote = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "50px",
        borderBottom: "1px solid grey",
        paddingBottom: "10px",
        backgroundColor: props.backgroundColor,
        ...props.style,
      }}
    >
      <div style={{ textAlign: "left" }}>
        <h3
          style={{ fontWeight: "bold", color: "#090909", ...props.titleStyle }}
        >
          {props.title}
        </h3>
        <p style={{ color: "#999", ...props.descriptionStyle }}>
          {props.description}
        </p>
      </div>
      {props.right}
    </div>
  );
};
