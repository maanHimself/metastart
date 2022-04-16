import { Controller, Scene } from "react-scrollmagic";
import { FC } from "react";
import { Tween, Timeline } from "react-gsap";
// import { Zoom } from "react-awesome-reveal";
const Zoom = require("react-reveal/Zoom");

type props = {
  src: string;
  id: string;
};

const AnimatedIcon: FC<props> = (props: props) => {
  return (
    <div>
      <Zoom delay={100} exit={true}>
        <img src={props.src} id={props.id} className="mb-8 mt-8" />
      </Zoom>
    </div>
  );
};

export { AnimatedIcon };
