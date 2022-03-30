import AboutSection from "../components/AboutSection/AboutSection";
import ThreeContainer from "./ThreeComp";

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
        src="/goal.png"
        id="goal"
        titel="MISSION"
        desc="Mission to accelerate the Migration of creators and businesses
      towards the web 3.0 sphere by building and providing future ready
      products and services."
      />
      <AboutSection
        src="/vision.png"
        id={"vision"}
        reverse
        titel="VISION"
        desc="Vision to build a democratic and decentralized world and concomitantly
          allowing clients to harness the full potential of the future."
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
