import React from "react";

export default function Screen(props) {
  const { configs, currentFrame, children } = props;
  return (
    <>
      {configs.totalFrames === 0 ? (
        <p>Nenhuma Imagem</p>
      ) : (
        <img
          src={currentFrame.url}
          alt="new"
          style={{ height: 350, width: "100%" }}
        />
      )}
      {children}
    </>
  );
}
