import React, { Component } from "react";
import Sketch from "../threejs/ThreeApp";

export default function ThreeContainer() {
  const threeRootElement = React.useRef(null);
  const path = React.useRef(null);
  const svg = React.useRef(null);
  React.useEffect(() => {
    Sketch(threeRootElement.current);
    // threeRootElement.current.style.display = "fixed";
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
        id="three"
        className={"three bg-black h-screen w-screen block fixed -z-10 m-0 p-0"}
        ref={threeRootElement}
      />
    </>
  );
}
