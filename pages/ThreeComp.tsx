import { useEffect, useLayoutEffect, useRef } from "react";
import Sketch from "../threejs/ThreeApp";

export default function ThreeContainer() {
  const threeRootElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    Sketch(threeRootElement.current);
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
