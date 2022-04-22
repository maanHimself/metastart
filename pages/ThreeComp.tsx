import React from "react";
import Sketch from "../threejs/ThreeApp";

export default function ThreeContainer() {
  const threeRootElement = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    let s: null | void = Sketch(threeRootElement.current);
    return () => {
      s = null;
    };
  }, []);

  return (
    <>
      <div
        id="three"
        className={"three bg-black h-screen w-screen block fixed -z-10 m-0 p-0"}
        ref={threeRootElement}
      />
    </>
  );
}
