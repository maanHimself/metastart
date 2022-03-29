import ThreeContainer from "./ThreeComp";
import AboutSection from "../Components/AboutSection.tsx/AboutSection";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center m-0 p-6 pt-0 pb-0 ">
      <ThreeContainer></ThreeContainer>

      <div className="h-screen w-full flex items-center justify-center ">
        <img
          id="logo"
          src="/logo.png"
          className="inline-block opacity-0  "
        ></img>
      </div>

      <AboutSection
        renderImage={() => (
          <img
            id="goal"
            src="/goal.png"
            className="h-60  inline-block opacity-0"
          ></img>
        )}
        renderDescription={() => (
          <>
            <p className=" text-4xl">MISSION</p>
            <p className=" md:text-2xl text-lg">
              Mission to accelerate the Migration of creators and businesses
              towards the web 3.0 sphere by building and providing future ready
              products and services.
            </p>
          </>
        )}
      />
      <AboutSection
        reverse={true}
        renderImage={() => (
          <img
            id="vision"
            src="/vision.png"
            className="h-60 right-0 inline-block opacity-0 "
          ></img>
        )}
        renderDescription={() => (
          <>
            <p className=" left-full right-0 text-4xl md:text-left text-center">
              VISION
            </p>
            <p className=" md:text-2xl text-lg">
              Vision to build a democratic and decentralized world and
              concomitantly allowing clients to harness the full potential of
              the future.
            </p>
          </>
        )}
      />

      <p className=" pt-24 pb-0 mt-10 text-white font-main md:text-6xl text-4xl">
        PROJECTS
      </p>
      <div className="flex flex-col md:flex-row md:justify-around w-full  md:space-x-4 mt-8 text-white font-main">
        <div className="flex flex-col mb-10">
          <img id="" src="/WT 1801-1.jpg" className=" m-0 "></img>
          <p className=" left-full right-0 text-4xl  mt-4">Indie Company</p>
          <p className=" left-full right-0 text-2xl m-2">
            Our own crypto enabled e-commerce
          </p>
        </div>
        <div className="flex flex-col-reverse md:flex-col ">
          <div>
            <p className=" left-full right-0 text-4xl mt-4">Indie Company</p>
            <p className=" left-full right-0 text-2xl m-2 md:mb-8 ">
              Our own crypto enabled e-commerce
            </p>
          </div>
          <img id="" src="/WT 1801-1.jpg" className=" m-0"></img>
        </div>
      </div>
      <p className=" pt-24 pb-0 text-white font-main text-6xl text-center">
        THE TEAM
      </p>
      <div className="flex flex-row justify-around items-center w-full flex-wrap  mt-4">
        <img
          id="team1"
          src="/team1.png"
          className=" mt-10 max-h-56 opacity-0"
        ></img>
        <img
          id="team2"
          src="/team2.png"
          className="max-h-56 mt-10 opacity-0"
        ></img>
        <img
          id="team3"
          src="/team1.png"
          className="max-h-56 mt-10 opacity-0"
        ></img>
      </div>
    </div>
  );
}
