import { FC } from "react";

type AboutSectionProps = {
  renderImage: () => JSX.Element;
  renderDescription: () => JSX.Element;
  className?: String;
  reverse?: Boolean;
};
const AboutSection: FC<AboutSectionProps> = (props: AboutSectionProps) => {
  const reverseClassName = props.reverse
    ? "md:flex-row-reverse"
    : "md:flex-row";
  return (
    <div
      className={`flex items-center justify-center max-w-6xl h-full
      text-white p-4 font-main flex-col md:flex-row space-y-5 md:space-y-0 md:text-left text-center ${reverseClassName} ${props.className}`}
    >
      {props.renderImage()}
      <div className=" ">{props.renderDescription()}</div>
    </div>
  );
};

// function AboutSection(
//   renderImage: () => JSX.Element,
//   renderDescription: () => JSX.Element,
//   className?: String,
//   reverse?: Boolean
// ) {
//   const reverseClassName = reverse ? "md:flex-row-reverse" : "md:flex-row";
//   return (
//     <div
//       className={`flex items-center justify-center max-w-6xl h-full text-white p-4 font-main flex-col md:flex-row space-y-5 md:space-y-0 md:text-left text-center ${reverseClassName} ${className}`}
//     >
//       {renderImage()}
//       <div className="md:pl-10 ">{renderDescription()}</div>
//     </div>
//   );
// }

export default AboutSection;
