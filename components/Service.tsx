import Typewriter from "typewriter-effect";
import { FC } from "react";

type AboutSectionProps = {
  text: string;
  visible: boolean;
};

const Service: FC<AboutSectionProps> = (props: AboutSectionProps) => {
  return (
    <>
      {props.visible && (
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .callFunction((state) => {
                state.elements.container.style.fontSize = "250%";
                state.elements.container.style.color = "#FFFFFF";
                // state.elements.wrapper.style.width = "30vw";
              })
              .pauseFor(250)
              .typeString(props.text)
              .pauseFor(2500)
              .start();
          }}
          options={{
            delay: 10,
          }}
        />
      )}
    </>
  );
};

export default Service;
