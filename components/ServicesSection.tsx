import { AnimatedIcon } from "./AnimatedIcon";

export default function Services() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full opacity-0">
        <img
          id="s1"
          src="/services/1.png"
          className="md:w-1/2 w-3/4 mb-16"
        ></img>
        <div className="flex flex-row justify-around items-center md:w-3/4 w-full ">
          <img
            id="s3"
            src="/services/3.png"
            className="w-3/6 -translate-y-16"
          ></img>
          <img
            id="s2"
            src="/services/2.png"
            className="w-2/5 translate-x-[5vw] translate-y-16"
          ></img>
        </div>
        <img
          id="s4"
          src="/services/4.png"
          className="md:w-2/4 w-3/5 md:-translate-x-[20vw] -translate-x-[20vw]"
        ></img>
        <img
          id="s5"
          src="/services/5.png"
          className="w-full md:mt-0 mt-10
           -translate-y-[5vw]"
        ></img>
      </div>
    </>
  );
}
