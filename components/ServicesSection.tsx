import { AnimatedIcon } from "./AnimatedIcon";

export default function Services() {
  return (
    <>
      <div className="flex flex-row flex-wrap justify-center items-center w-full max-w-7xl opacity-100">
        <div className="w-full flex flex-row flex-wrap justify-center items-center ">
          <AnimatedIcon src="services/1.png" id="s1" />
        </div>
        <AnimatedIcon src="services/2.png" id="s2" />
        <AnimatedIcon src="services/3.png" id="s3" />
        <div className="w-full flex flex-row flex-wrap justify-center items-center translate-y-10">
          <AnimatedIcon src="services/4.png" id="s4" />
        </div>
        <AnimatedIcon src="services/5.png" id="s5" />
      </div>
    </>
  );
}
