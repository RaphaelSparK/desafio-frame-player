import React from "react";
import { Layout, Row, Col, PageHeader } from "antd";
import FramePlayer from "./Components/FramePlayer/index.tsx";

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Content>
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title="Desafio"
          subTitle="Frame Player"
        />
        <Row justify="center">
          <Col>
            <FramePlayer
              frames={[
                "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/20786/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/20785/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/20784/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/20766/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/20775/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/20767/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/20762/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
                "https://images.pexels.com/photos/20565/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
              ]}
              fps={0.2}
            ></FramePlayer>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
