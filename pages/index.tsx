import AboutSection from "../components/AboutSection/AboutSection";
import ThreeContainer from "./ThreeComp";
import { useInView } from "react-intersection-observer";
import Service from "../components/Service";
export default function Home() {
  // let services = useRef(null);

  const { ref: services, inView: myElementIsVisible } = useInView();

  return (
    <div className="h-full w-full flex flex-col items-center justify-center m-0 p-6 pt-0 pb-0">
      <ThreeContainer></ThreeContainer>

      <div className="h-screen w-full flex items-center justify-center ">
        <img
          id="logo"
          src="/logo.png"
          className="inline-block opacity-0  "
        ></img>
      </div>

      <p className=" pt-10 pb-24 text-white font-main text-2xl text-center">
        WE ...
      </p>
      <div
        ref={services}
        className="h-full w-full items-center  text-white font-main over break-words 
        justify-evenly flex-wrap space-x-1 md:space-y-0 space-y-6 mb-48 flex flex-col md:flex-row "
      >
        <Service
          titel="BUILD DEFI APPS"
          desc="maan"
          visible={myElementIsVisible}
          src="defi.png"
        ></Service>

        <Service
          titel="BUILD SMART CONTRACTS"
          desc="maan mohammed ali nasser bafayadh al awalaqi hna nohn where you are "
          visible={myElementIsVisible}
          src="smartContracts.png"
        ></Service>

        <div className="md:h-20 md:w-full w-0 h-0 hidden md:block"></div>

        <Service
          titel="CREAT TOKENS"
          desc="maan"
          visible={myElementIsVisible}
          src="defi.png"
        ></Service>

        <Service
          titel="PROVIDE NFT SERVICES"
          desc="maan"
          visible={myElementIsVisible}
          src="defi.png"
        ></Service>

        <div className="md:h-20 md:w-full w-0 h-0 hidden md:block"></div>

        <Service
          titel="PROVIDE METAVERSE SERVICES"
          desc="maan"
          visible={myElementIsVisible}
          src="defi.png"
        ></Service>
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
      <div className="flex flex-col max-w-6xl md:flex-row md:justify-around w-full  md:space-x-4 mt-8 text-white font-main">
        <div className="flex flex-col items-center justify-center mb-10">
          <img id="" src="/WT 1801-1.jpg" className=" max-w-md m-0 "></img>
          <p className=" text-center right-0 text-4xl  mt-4">Indie Company</p>
          <p className=" text-center right-0 text-2xl m-2">
            Our own crypto enabled e-commerce
          </p>
        </div>
        <div className="flex flex-col-reverse items-center justify-center md:flex-col ">
          <div>
            <p className=" text-center right-0 text-4xl mt-4">Indie Company</p>
            <p className=" text-center right-0 text-2xl m-2 md:mb-8 ">
              Our own crypto enabled e-commerce
            </p>
          </div>
          <img id="" src="/WT 1801-1.jpg" className=" max-w-md m-0"></img>
        </div>
      </div>
      <p className=" pt-24 pb-0 text-white font-main text-6xl text-center">
        THE TEAM
      </p>
      <div className="flex flex-row justify-around items-center w-full flex-wrap max-w-6xl mt-4">
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
          src="/team3.png"
          className="max-h-56 mt-10 opacity-0"
        ></img>
      </div>

      <div className="h-screen w-full flex flex-col items-center justify-center font-main space-y-6">
        <p className=" pt-24 pb-10 text-white font-main text-6xl text-center">
          contact us
        </p>
        <input
          placeholder="Name"
          type={"text"}
          className="w-3/4 h-10 rounded-md border-2 text-white border-[#0daa93] bg-transparent bg-[#0DAA93] bg-opacity-10 p-2 "
        ></input>
        <input
          placeholder="Email"
          type={"email"}
          className="w-3/4 h-10 rounded-md border-2 text-white border-[#0daa93] bg-transparent bg-[#0DAA93] bg-opacity-10 p-2 "
        ></input>
        <textarea
          placeholder="Details"
          className="w-3/4 h-48 rounded-md border-2 text-white resize-none align-text-top border-[#0daa93] bg-transparent bg-[#0DAA93] bg-opacity-10 p-2 "
        ></textarea>

        <button className="w-3/4 h-10 rounded-md border-2 text-white border-[#0daa93]  bg-[#0DAA93]  p-2 ">
          Send
        </button>
      </div>
      <div className="w-full h-16  flex flex-row items-center justify-center space-x-4 ">
        <img id="media" src="/whatsapp.png" className="block w-8"></img>
        <img id="media" src="/twitter.png" className="block w-8"></img>
        <img id="media" src="/email.png" className="block w-8"></img>
        <img id="media" src="/facebook.png" className="block w-8"></img>
      </div>
    </div>
  );
}
