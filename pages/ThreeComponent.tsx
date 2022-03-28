import React, { Component } from "react";
import sketch from "../threejs/ThreeApp";

export default function ThreeContainer() {
  const containerRef = useThree();
  return (
    <div
      className="h-full w-full fixed top-0 left-0 -z-10"
      ref={containerRef}
    />
  );
}

const useThree = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!!!containerRef) return;
    sketch(containerRef.current as HTMLDivElement);
  }, [containerRef]);
  return containerRef;
};
