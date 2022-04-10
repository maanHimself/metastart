import Typewriter from "typewriter-effect";
import { FC } from "react";

type AboutSectionProps = {
  titel: string;
  desc: string;
  visible: boolean;
  src: string;
};

const Service: FC<AboutSectionProps> = (props: AboutSectionProps) => {
  return (
    <div
      className="md:w-2/5 w-full h-56 rounded-md border-2 bg-transparent bg-[#0DAA93] bg-opacity-25 p-2 "
      style={{
        borderColor: "#0daa93",
      }}
    >
      <img
        id="icon"
        src={props.src}
        className="  md:h-28 h-20 float-right -translate-y-12 translate-x-4"
      ></img>
      {props.visible && (
        <>
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .callFunction((state) => {
                  state.elements.container.style.fontSize = "170%";
                  state.elements.container.style.color = "#09F6FB";
                })
                .pauseFor(250)
                .typeString(props.titel)
                .pauseFor(2500)
                .start();
            }}
            options={{
              delay: 10,
              cursor: "",
            }}
          />
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .callFunction((state) => {
                  state.elements.container.style.fontSize = "150%";
                  // state.elements.wrapper.style.overflowWrap =
                  //   "break-word";
                  // state.elements.wrapper.style.whiteSpace = "pre-wrap";
                })
                .pauseFor(250)
                .typeString(props.desc)
                .pauseFor(2500)
                .start();
            }}
            options={{
              delay: 10,
            }}
          />
        </>
      )}
    </div>
  );
};

export default Service;
