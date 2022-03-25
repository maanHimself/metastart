import ThreeContainer from "./ThreeComp";
const Scrollbar = require("react-smooth-scrollbar");

export default function Home() {
  return (
    <>
      <div className="h-fu w-full flex flex-col items-center justify-center p-10">
        <ThreeContainer></ThreeContainer>
        <div className="h-screen w-full flex items-center justify-center ">
          <img
            id="logo"
            src="/logo.png"
            className="h-48 inline-block opacity-0  "
          ></img>
        </div>

        <div className="flex items-center justify-center w-full h-full text-white p-4 font-main">
          <img
            id="goal"
            src="/goal.png"
            className="h-60  inline-block opacity-0 "
          ></img>
          <div className="pl-10 max-w-3xl">
            <div className=" text-4xl">MISSION</div>
            <div className=" text-2xl">
              Mission to accelerate the Migration of creators and businesses
              towards the web 3.0 sphere by building and providing future ready
              products and services.
            </div>
          </div>
        </div>
        <div className="flex items-center w-full h-full justify-center text-white p-4 font-main ">
          <div className="pr-10 w-full text-right max-w-3xl ">
            <div className=" left-full right-0 text-4xl ">VISION</div>
            <div className=" text-2xl">
              Vision to build a democratic and decentralized world and
              concomitantly allowing clients to harness the full potential of
              the future.
            </div>
          </div>
          <img
            id="goal"
            src="/vision.png"
            className="h-60 right-0 inline-block opacity-100 "
          ></img>
        </div>
      </div>
    </>
  );
}
