import React from "react";
import { Row, Col, Button, Space } from "antd";
import {
  PauseOutlined,
  CaretRightOutlined,
  StopOutlined,
  BackwardOutlined,
  ForwardOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
export default function Controls(props) {
  const {
    configs,
    currentFrame,
    playerStatus,
    handlePlay,
    handlePause,
    handleStop,
    handleNext,
    handlePrevious,
    handleReset,
  } = props;
  return (
    <Row justify="center" style={{ margin: 20 }}>
      <Col>
        <Space>
          <Button
            type="primary"
            shape="circle"
            disabled={currentFrame.index === 0}
            onClick={handlePrevious}
            icon={<BackwardOutlined />}
          />
          <Button
            type="primary"
            shape="circle"
            disabled={playerStatus.isPlaying || !currentFrame.url}
            onClick={handlePlay}
            icon={<CaretRightOutlined />}
          />
          <Button
            type="primary"
            shape="circle"
            disabled={playerStatus.isPaused || !currentFrame.url}
            onClick={handlePause}
            icon={<PauseOutlined />}
          />
          <Button
            type="primary"
            shape="circle"
            disabled={playerStatus.isStoped || !currentFrame.url}
            onClick={handleStop}
            icon={<StopOutlined />}
          />
          <Button
            type="primary"
            shape="circle"
            disabled={
              configs.totalFrames < 1 ||
              currentFrame.index === configs.totalFrames - 1
            }
            onClick={handleNext}
            icon={<ForwardOutlined />}
          />
          <Button
            type="primary"
            shape="circle"
            disabled={configs.totalFrames < 1}
            onClick={handleReset}
            icon={<RetweetOutlined />}
          />
        </Space>
      </Col>
    </Row>
  );
}
