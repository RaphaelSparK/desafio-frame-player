import React, { useState, useEffect, useRef } from "react";

import Screen from "./components/Screen/index.tsx";
import TimeSlider from "./components/TimeSlider/index.tsx";
import Info from "./components/Info/index.tsx";
import Controls from "./components/Controls/index.tsx";

interface IFramePlayerProps {
  frames: string[];
  fps: number;
}

interface IFrameState {
  index: number;
  url: string | null;
  timeEnd: number;
}

interface IPlayerState {
  statusDescrition: string;
  isPlaying: boolean;
  isPaused: boolean;
  isStoped: boolean;
}

const FramePlayer: React.FunctionComponent<IFramePlayerProps> = (props) => {
  const { frames, fps } = props;

  const configs = {
    totalFrames: frames.length,
    tempoPorFrame: frames.length / fps / frames.length,
    tempoTotal: frames.length / fps,
  };

  const InitialFrameState: IFrameState = {
    index: 0,
    url: frames[0] || null,
    timeEnd: configs.tempoPorFrame,
  };

  const InitialPlayerState: IPlayerState = {
    statusDescrition: "Waiting",
    isPlaying: false,
    isPaused: false,
    isStoped: false,
  };

  const [currentFrame, setCurrentFrame] =
    useState<IFrameState>(InitialFrameState);

  const [player, setPlayer] = useState<IPlayerState>(InitialPlayerState);

  const [currentTime, setCurrentTime] = useState(1);

  const intervalRef = useRef();
  const timeoutRef = useRef();

  // console.log("", configs);

  const previousFrame = () => {
    if (currentFrame.index !== 0) {
      setCurrentFrame((oldValue) => ({
        index: oldValue.index - 1,
        url: frames[oldValue.index - 1],
        timeEnd: (oldValue.index - 1) * configs.tempoPorFrame,
      }));
      let tempo = (currentFrame.index - 1) * configs.tempoPorFrame;
      setCurrentTime(tempo);
    }
  };
  const nextFrame = () => {
    if (currentFrame.index !== configs.totalFrames - 1) {
      setCurrentFrame((oldValue) => ({
        index: oldValue.index + 1,
        url: frames[oldValue.index + 1],
        timeEnd: (oldValue.index + 1) * configs.tempoPorFrame,
      }));
      let tempo = (currentFrame.index + 1) * configs.tempoPorFrame;
      setCurrentTime(tempo);
    }
  };

  const handlePlay = () => {
    if (player.statusDescrition === "Stoped") {
      setCurrentFrame(InitialFrameState);
      setCurrentTime(1);
    }
    setPlayer({
      ...player,
      statusDescrition: "Playing",
      isPlaying: true,
      isPaused: false,
      isStoped: false,
    });
    playTimer();
  };

  const handlePause = () => {
    setPlayer({
      ...player,
      statusDescrition: "Paused",
      isPlaying: false,
      isPaused: true,
    });

    clearTimeout(timeoutRef.current);
    pauseTimer();
  };

  const handleStop = () => {
    setPlayer({
      ...player,
      statusDescrition: "Stoped",
      isPlaying: false,
    });
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
  };

  const playTimer = () => {
    if (player.statusDescrition === "Stoped") {
      setCurrentFrame(InitialFrameState);
      setCurrentTime(0);
    } else {
      setCurrentTime(currentFrame.index * configs.tempoPorFrame);
    }

    let id = setInterval(() => {
      setCurrentTime((oldState) => oldState + 1);
    }, 1000);

    intervalRef.current = id;
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
  };

  const handleRange = (value) => {
    handlePause();
    setCurrentTime(value);
    let frame = Math.ceil(value / configs.tempoPorFrame) - 1;
    setCurrentFrame({
      index: frame,
      url: frames[frame],
      timeEnd: frame * configs.tempoPorFrame,
    });
  };

  const tick = () => {
    let id = setTimeout(() => {
      currentFrame.index !== configs.totalFrames - 1 && player.isPlaying
        ? nextFrame()
        : handleStop();
    }, configs.tempoPorFrame * 1000);
    timeoutRef.current = id;
  };

  const reset = () => {
    pauseTimer();
    setPlayer(InitialPlayerState);
    setCurrentFrame(InitialFrameState);
    setCurrentTime(1);
  };

  useEffect(() => {
    if (player.isPlaying) {
      tick();
    }
    return () => clearTimeout(timeoutRef.current);
  }, [player.isPlaying, currentFrame]);

  return (
    <>
      <Screen currentFrame={currentFrame} configs={configs}>
        <TimeSlider
          currentTime={currentTime}
          totalTime={configs.tempoTotal}
          handleRange={handleRange}
          disabled={false}
        ></TimeSlider>
        <Info
          currentFrame={currentFrame}
          currentTime={currentTime}
          statusDescrition={player.statusDescrition}
          totalFrames={configs.totalFrames}
        ></Info>
      </Screen>
      <Controls
        configs={configs}
        currentFrame={currentFrame}
        playerStatus={player}
        handlePlay={handlePlay}
        handlePause={handlePause}
        handleStop={handleStop}
        handleNext={nextFrame}
        handlePrevious={previousFrame}
        handleReset={reset}
      ></Controls>
    </>
  );
};

export default FramePlayer;
