import { AnimatedIcon } from "./AnimatedIcon";

export default function Services() {
  return (
    <>
      <div className="flex flex-row flex-wrap justify-center items-center w-full max-w-7xl opacity-0">
        <div className="w-full flex flex-row flex-wrap justify-center items-center ">
          <AnimatedIcon src="services/1.png" id="s1" />
        </div>
        <AnimatedIcon src="services/2.png" id="s2" />
        <AnimatedIcon src="services/3.png" id="s3" />
        <div className="w-full flex flex-row flex-wrap justify-center items-center translate-y-10">
          <AnimatedIcon src="services/4.png" id="s4" />
        </div>
        <AnimatedIcon src="services/5.png" id="s5" />
        {/* <img
          id="s1"
          src="/services/1.png"
          className="md:w-1/2 w-4/4 mb-16"
        ></img> */}
        {/* <div className="flex flex-row justify-around items-center md:w-3/4 w-full ">
          <img
            id="s3"
            src="/services/3.png"
            className="md:w-3/6 w-3/6 -translate-y-16 "
          ></img>
          <img
            id="s2"
            src="/services/2.png"
            className="md:w-2/5 w-2/5 translate-x-[5vw] translate-y-16 "
          ></img>
        </div>
        <img
          id="s4"
          src="/services/4.png"
          className="md:w-2/4 w-2/5 md:-translate-x-[20vw] -translate-x-[20vw] "
        ></img>
        <img
          id="s5"
          src="/services/5.png"
          className="w-full md:mt-0 mt-10 
           -translate-y-[5vw]"
        ></img> */}
      </div>
    </>
  );
}
