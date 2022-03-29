import React, { Component } from "react";
import Sketch from "../threejs/ThreeApp";

export default function ThreeContainer() {
  const threeRootElement = React.useRef(null);
  const path = React.useRef(null);
  const svg = React.useRef(null);
  React.useEffect(() => {
    Sketch(threeRootElement.current);
  }, []);

  return (
    <>
      <div
        // style={{
        //   height: "100vh",
        //   width: "100vw",
        //   position: "absolute",
        //   left: 0,
        //   top: 0,
        //   zIndex: -1,
        // }}
        className={"h-full w-full fixed top-0 left-0 -z-10 m-0 p-0"}
        ref={threeRootElement}
      />
    </>
  );
}
