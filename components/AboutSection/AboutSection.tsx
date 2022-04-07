import classNames from "classnames";
import { FC } from "react";

type AboutSectionProps = {
  className?: String;
  reverse?: Boolean;
  titel: string;
  desc: string;
  id: string;
  src: string;
};

const AboutSection: FC<AboutSectionProps> = (props: AboutSectionProps) => {
  const reverseClassName = props.reverse
    ? "md:flex-row-reverse"
    : "md:flex-row";
  return (
    <div
      className={classNames(
        "flex items-center justify-center items max-w-6xl h-full text-white p-4 font-main flex-col md:flex-row space-y-5 md:space-y-0",

        reverseClassName
      )}
    >
      <img
        id={props.id}
        src={props.src}
        className="w-60 right-0 inline-block opacity-0 "
      ></img>
      <div className="md:pl-10  md:text-left text-center">
        <p className="text-4xl">{props.titel}</p>
        <p className=" md:text-2xl text-lg">{props.desc}</p>
      </div>
    </div>
  );
};

export default AboutSection;
