import React from "react";
import { Row, Col, Button } from "antd";
import { BarChartOutlined, BgColorsOutlined } from "@ant-design/icons";
import Link from "next/link";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("/bg.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
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
                      maxWidth: "90%",
                      fontSize: "35px",
                      color: "#fff",
                    }}
                  >
                    It is a long established fact that a reader will be
                    distracted by the readable
                  </h2>
                </div>
                <div style={{ marginTop: "40px" }}>
                  <Button
                    size="large"
                    style={{
                      fontWeight: "bold",
                      padding: "0 60px",
                      backgroundColor: "blueviolet",
                      color: "#fff",
                    }}
                  >
                    Start Quiz
                  </Button>
                </div>
              </Col>
              <Col lg={12}>
                <div style={{ marginTop: "60px" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                      justifyContent: "flex-end",
                      marginTop: "25px",
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
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div
            style={{ textAlign: "center", color: "#fff", marginTop: "50px" }}
          >
            <p style={{ fontSize: "16px", margin: "0", color: "#ada3a3" }}>
              Attempt History
            </p>
            <p style={{ margin: "0" }}>July 25th, 2020</p>
            <p>July 25th, 2020</p>
            <p>
              Don't have time? You can <Link href="/">Skip this lesson</Link>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
