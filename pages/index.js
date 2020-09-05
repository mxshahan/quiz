import React, { useEffect, useState } from "react";
import { Row, Col, Button, Tag } from "antd";
import { BarChartOutlined, BgColorsOutlined } from "@ant-design/icons";
import Link from "next/link";
import data from "../components/quiz.json";
import { useRouter } from "next/router";
import moment from "moment";

const Home = () => {
  const router = useRouter();
  const [attemptData, setAttemptData] = useState(data.quiz.results);

  useEffect(() => {
    let result = {};
    const { score = 0, totalQuestion = 0 } = router.query;

    console.log(router.query);

    if (score > 0 && totalQuestion > 0) {
      const percent = ((score / totalQuestion) * 100).toFixed(1);

      if (percent <= 50) {
        result[new Date()] = [percent || 0, "fail"];
      } else {
        result[new Date()] = [percent || 0, "pass"];
      }
      setAttemptData([...attemptData, result]);
    }
  }, [router.query]);

  // useEffect(() => {
  //   window.document.body.style = "background: #031e40";
  // });

  console.log(attemptData);

  return (
    <div
      style={{
        height: "100vh",
        background: "#031e40",
      }}
    >
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <div className="home" style={{ marginTop: "150px" }}>
            <Row gutter={[16, 16]}>
              <Col lg={12}>
                <div>
                  <h2
                    style={{
                      fontWeight: "bold",
                      fontSize: "35px",
                      color: "#fff",
                    }}
                  >
                    {data.quiz.quiz_name}
                  </h2>
                  <p
                    style={{
                      maxWidth: "90%",
                      color: "#fff",
                    }}
                  >
                    {data.quiz.quiz_description}
                  </p>
                </div>
                <div style={{ marginTop: "40px" }}>
                  <Button
                    size="large"
                    shape="round"
                    style={{
                      fontWeight: "bold",
                      padding: "0 60px",
                      backgroundColor: "blueviolet",
                      color: "#fff",
                      border: "0px none",
                    }}
                    onClick={() => router.push("/episode")}
                  >
                    Start Quiz
                  </Button>
                </div>

                <p style={{ color: "white", marginTop: 25 }}>
                  Don't have time? You can{" "}
                  <Link href="/">Skip this lesson</Link>
                </p>
              </Col>
              <Col lg={2}></Col>
              <Col lg={10}>
                <div style={{}}>
                  <div
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <BarChartOutlined
                      style={{
                        color: "#fff",
                        fontSize: "50px",
                        marginRight: "20px",
                      }}
                    />
                    <div style={{ textAlign: "left" }}>
                      <p
                        style={{ fontSize: "15px", color: "#fff", margin: "0" }}
                      >
                        Skill
                      </p>
                      <p style={{ fontSize: "20px", color: "#fff" }}>
                        100 Questions
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginTop: 20,
                    }}
                  >
                    <BarChartOutlined
                      style={{
                        color: "#fff",
                        fontSize: "50px",
                        marginRight: "20px",
                      }}
                    />
                    <div style={{ textAlign: "left" }}>
                      <p
                        style={{ fontSize: "15px", color: "#fff", margin: "0" }}
                      >
                        Skill
                      </p>
                      <p style={{ fontSize: "20px", color: "#fff" }}>
                        100 Questions
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "left",
                      color: "#fff",
                      marginTop: "50px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "16px",
                        margin: "0",
                        color: "#ada3a3",
                        marginBottom: "15px",
                      }}
                    >
                      Attempt History
                    </p>
                    {attemptData.map((item) => {
                      const objKey = Object.keys(item);
                      const key = objKey[0];
                      return (
                        <div
                          style={{
                            width: "85%",
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "10px",
                          }}
                        >
                          <p style={{ margin: "0" }}>
                            {moment(key).format("MMM D, YYYY")}
                          </p>
                          <Tag
                            color={`${
                              item[key][1] === "pass" ? "#87d068" : "red"
                            }`}
                          >
                            {item[key][0]}%{item[key][1]}
                          </Tag>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
