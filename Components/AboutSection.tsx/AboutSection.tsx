import classNames from "classnames";
import { FC } from "react";

type AboutSectionProps = {
  renderImage: () => JSX.Element;
  renderDescription: () => JSX.Element;
  className?: String;
  reverse?: Boolean;
  [x: string]: any;
};
const AboutSection: FC<AboutSectionProps> = ({
  renderImage,
  renderDescription,
  className,
  reverse = false,
  ...restProps
}) => {
  const reverseClassName = reverse ? "md:flex-row-reverse" : "md:flex-row";
  return (
    <div
      className={classNames(
        className,
        reverseClassName,
        "flex items-center justify-center w-full h-full text-white p-4 font-main flex-col md:flex-row space-y-5 md:space-y-0"
      )}
      {...restProps}
    >
      {renderImage()}
      <div className="pl-10 max-w-3xl">{renderDescription()}</div>
    </div>
  );
};

export default AboutSection;
