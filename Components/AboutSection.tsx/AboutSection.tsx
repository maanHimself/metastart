import { FC } from "react";

type AboutSectionProps = {
  renderImage: () => JSX.Element;
  renderDescription: () => JSX.Element;
  className?: String;
  reverse?: Boolean;
};
const AboutSection: FC<AboutSectionProps> = ({
  renderImage,
  renderDescription,
  className,
  reverse = false,
}) => {
  const reverseClassName = reverse ? "md:flex-row-reverse" : "md:flex-row";
  return (
    <div
      className={`flex items-center justify-center w-full h-full text-white p-4 font-main flex-col md:flex-row space-y-5 md:space-y-0 ${className} ${reverseClassName}`}
    >
      {renderImage()}
      <div className="pl-10 max-w-3xl">{renderDescription()}</div>
    </div>
  );
};

export default AboutSection;
