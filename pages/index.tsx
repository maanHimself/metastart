import ThreeContainer from "./ThreeComponent";
import AboutSection from "../Components/AboutSection.tsx/AboutSection";

//use next/image instead of img
export default function Home() {
  return (
    <div className="h-fu w-full flex flex-col items-center justify-center p-10">
      <ThreeContainer></ThreeContainer>

      <div className="h-screen w-full flex items-center justify-center">
        <img id="logo" src="/logo.png" className="inline-block opacity-0" />
      </div>

      <AboutSection
        renderImage={() => (
          <img
            id="goal"
            src="/goal.png"
            className="h-60  inline-block opacity-0"
          />
        )}
        renderDescription={() => (
          <>
            <p className=" text-4xl">MISSION</p>
            <p className=" text-2xl">
              Mission to accelerate the Migration of creators and businesses
              towards the web 3.0 sphere by building and providing future ready
              products and services.
            </p>
          </>
        )}
      />
      <AboutSection
        reverse
        renderImage={() => (
          <img
            id="vision"
            src="/vision.png"
            className="h-60 right-0 inline-block opacity-0"
          />
        )}
        renderDescription={() => (
          <>
            <p className=" left-full right-0 text-4xl ">VISION</p>
            <p className=" text-2xl">
              Vision to build a democratic and decentralized world and
              concomitantly allowing clients to harness the full potential of
              the future.
            </p>
          </>
        )}
      />
    </div>
  );
}
