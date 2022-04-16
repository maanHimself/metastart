import { Controller, Scene } from "react-scrollmagic";
import { FC } from "react";
import { Tween, Timeline } from "react-gsap";
import { Zoom } from "react-awesome-reveal";
// const Zoom = require("react-reveal/Zoom");

type props = {
  src: string;
};

const AnimatedIcon: FC<props> = (props: props) => {
  return (
    <div>
      <Zoom delay={100}>
        <img src={props.src} />
      </Zoom>
    </div>
  );
};

export { AnimatedIcon };
