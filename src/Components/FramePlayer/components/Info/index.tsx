import React from "react";
import { Space, Tag } from "antd";
import moment from "moment";

export default function Info(props) {
  const { currentTime, currentFrame, totalFrames, statusDescrition } = props;
  return (
    <Space>
      <Tag>{moment(currentTime, "s").format("mm:ss")}</Tag>
      <Tag color="blue">{statusDescrition}</Tag>
      <Tag color="yellow">Frame Atual: {currentFrame.index + 1}</Tag>
      <Tag color="red">Tempo Atual:{currentFrame.timeEnd}s</Tag>
      <Tag color="green">Total de Frames: {totalFrames}</Tag>
    </Space>
  );
}
