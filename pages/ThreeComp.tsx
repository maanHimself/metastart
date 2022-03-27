import React, { Component } from "react";
import sketch from "../threejs/ThreeApp";

export default function ThreeContainer() {
  const threeRootElement = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!!!threeRootElement) return;
    sketch(threeRootElement.current as HTMLDivElement);
  }, [threeRootElement]);

  return (
    <div
      className={"h-full w-full fixed top-0 left-0 -z-10"}
      ref={threeRootElement}
    />
  );
}
