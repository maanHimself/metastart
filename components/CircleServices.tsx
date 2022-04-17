import React, { useRef, useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import Service from "./Service";

export default function CircleServices() {
  const graph = useRef<HTMLDivElement>(null);
  const [planet, setPlanet] = useState("w-[100px] h-[100px]");
  const [visible, setvisible] = useState<boolean>(true);

  useEffect(() => {
    const ciclegraph = graph.current;
    let circleElements: NodeListOf<ChildNode>;
    if (ciclegraph != null) {
      circleElements = ciclegraph.childNodes;

      let angle = 360 - 90;
      let dangle = 360 / circleElements.length;

      for (let i = 0; i < circleElements.length; i++) {
        let circle = circleElements[i] as HTMLDivElement;
        angle += dangle;
        circle.style.transform = `rotate(${angle}deg) translate(${
          ciclegraph.clientWidth / 2
        }px) rotate(-${angle}deg)`;
      }
    }
  }, []);

  return (
    <>
      <div className=" w-[60vw] max-w-[1300px]  h-[100vh] flex justify-center items-center ">
        <p
          className="text-white font-main md:text-6xl text-4xl text-center absolute"
          id="we"
        >
          WE ...
        </p>
        <div
          className="ciclegraph flex justify-center items-center"
          ref={graph}
        >
          <div className="circle">
            <img className={planet} src="/planets/1.png" alt="" />
            <Service text="WRITE SMART<br>CONTRACTS" visible={visible} />
          </div>
          <div className="circle">
            <img className={planet} src="/planets/2.png" alt="" />
            <Service text="BUILD NFT<br>MARKETPLACES" visible={visible} />
          </div>
          <div className="circle">
            <img className={planet} src="/planets/3.png" alt="" />
            <Service text="HOST EVENTS<br>IN THE METAVERSE" visible={visible} />
          </div>
          <div className="circle">
            <img className={planet} src="/planets/4.png" alt="" />
            <Service text="MAKE NFT<br>COLLECTIONS" visible={visible} />
          </div>
          <div className="circle">
            <img className={planet} src="/planets/5.png" alt="" />
            <Service text="BUILD METAVERSES" visible={visible} />
          </div>
        </div>
      </div>
    </>
  );
}
