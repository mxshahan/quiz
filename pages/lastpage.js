import React from "react";
import { Row, Col, Progress, Button } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";

const LastPage = () => {
  return (
    <div style={{ backgroundImage: 'url("/bg.jpg")' }}>
      <Row>
        <Col lg={4}></Col>
        <Col lg={16}>
          <div style={{ textAlign: "center", marginTop: "150px" }}>
            <Progress type="circle" percent={80} />
            <h2 style={{ fontSize: "35px", color: "#fff" }}>
              Congratulations!
            </h2>
            <p style={{color: '#fff'}}>
              You passed the JGGJJJJ kdjf ldfdf kdfjdkf kdfkj dfkjetet dtt
              ryrtyrtret rtrtrtrt
            </p>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "50px",
            }}
          >
            <h2 style={{ fontWeight: "bold", color: "#fff" }}>Whats Next?</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "50px",
                borderBottom: "1px solid grey",
                paddingBottom: "10px",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <h3 style={{ fontWeight: "bold", color: "#fff" }}>
                  Rate This Quiz
                </h3>
                <p style={{color: '#fff'}}>
                  dfkjdkf lskdf kd fkd dfjkdf ldkf dkfkdf ddskfjdf duh uf duf f
                  fuf dfudf udf d fo uiuhui h ih gu
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    borderRadius: "50%",
                    padding: "10px",
                    backgroundColor: '#fff',
                    height: "40px",
                    marginRight: "10px",
                  }}
                >
                  <LikeOutlined style={{ fontSize: "20px" }} />
                </div>
                <div
                  style={{
                    borderRadius: "50%",
                    backgroundColor: '#fff',
                    padding: "10px",
                    height: "40px",
                  }}
                >
                    <DislikeOutlined style={{ fontSize: "20px" }}/>
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: "50px",
                borderBottom: "1px solid grey",
                paddingBottom: "10px",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <h3 style={{ fontWeight: "bold", color: "#fff" }}>
                  Rate This Quiz
                </h3>
                <p style={{color: '#fff'}}>
                  dfkjdkf lskdf kd fkd dfjkdf ldkf dkfkdf ddskfjdf duh uf duf f
                  fuf dfudf udf d fo uiuhui h ih gu
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: 'space-between',
                  marginTop: "30px",
                  backgroundColor: '#5f0f5f',
                  padding: '5px',
                  borderRadius: '5px',
                  backgroundColor: 'violet'
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <h3 style={{ fontWeight: "bold", color: "#fff" }}>
                    Rate This Quiz
                  </h3>
                  <p style={{color: '#fff'}}>
                    dfkjdkf lskdf kd fkd dfjkdf ldkf dkfkdf ddskfjdf duh uf duf
                    f fuf dfudf udf d fo uiuhui h ih gu
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button>Next Quiz</Button>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "50px",
                borderBottom: "1px solid grey",
                paddingBottom: "10px",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <h3 style={{ fontWeight: "bold", color: "#fff" }}>
                  Rate This Quiz
                </h3>
                <p style={{color: '#fff'}}>
                  dfkjdkf lskdf kd fkd dfjkdf ldkf dkfkdf ddskfjdf duh uf duf f
                  fuf dfudf udf d fo uiuhui h ih gu
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button>Redo Quiz</Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LastPage;
