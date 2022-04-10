import AboutSection from "../components/AboutSection/AboutSection";
import ThreeContainer from "./ThreeComp";
import { useInView } from "react-intersection-observer";
import Service from "../components/Service";
import emailjs from "@emailjs/browser";
// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

import { useRef } from "react";

export default function Home() {
  // let services = useRef(null);

  const { ref: services, inView: myElementIsVisible } = useInView();

  const form = useRef() as React.MutableRefObject<HTMLFormElement>;

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qyvhhx4",
        "template_yqd7yyr",
        form.current!,
        "ipFgnqh9oaOBRsCmm"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="content h-full w-full flex flex-col items-center justify-center m-0 p-6 pt-0 pb-0">
      <ThreeContainer></ThreeContainer>

      <div className="h-screen w-full flex flex-col items-center justify-center ">
        <img
          id="logo"
          src="/logo.png"
          className="inline-block opacity-0 md:w-2/3 -translate-y-20 "
        ></img>
        <AwesomeButton
          type="primary"
          size="large"
          onPress={() => {
            scrollToBottom();
          }}
        >
          Contact us
        </AwesomeButton>
      </div>

      <p className=" pt-10 pb-24 text-white font-main text-4xl text-center">
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
          <img id="" src="/indie.png" className=" w-5/5 m-0 "></img>
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
          <img id="" src="/WT 1801-1.jpg" className=" w-5/5 m-0"></img>
        </div>
      </div>
      <p className=" pt-24 pb-0 text-white font-main text-6xl text-center">
        THE TEAM
      </p>
      <div className="flex flex-row justify-center items-center w-full flex-wrap max-w-7xl mt-4">
        <img
          id="team1"
          src="/team1.png"
          className=" mt-10 md:h-56 h-28 opacity-0  m-4"
        ></img>
        <img
          id="team2"
          src="/team2.png"
          className="md:h-56 h-28 mt-10 opacity-0 m-4"
        ></img>
        <img
          id="team3"
          src="/team3.png"
          className="md:h-56 h-28 mt-10 opacity-0 m-4"
        ></img>
        <img
          id="team4"
          src="/team4.png"
          className="md:h-56 h-28 mt-10 opacity-0 m-4"
        ></img>
        <img
          id="team5"
          src="/team5.png"
          className="md:h-56 h-28 mt-10 opacity-0 m-4"
        ></img>
      </div>

      <div className="h-screen w-full flex flex-col items-center justify-center font-main space-y-6">
        <p className=" pt-24 pb-10 text-white font-main text-6xl text-center">
          CONTACT US
        </p>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="w-full max-w-7xl text-[150%] flex flex-col items-center justify-center font-main space-y-6"
        >
          <input
            name="from_name"
            placeholder="Name"
            type={"text"}
            className="w-3/4 h-10 rounded-md border-2 text-white border-[#0daa93] bg-transparent bg-[#0DAA93] bg-opacity-10 p-2 "
          ></input>
          <input
            name="from_email"
            placeholder="Email"
            type={"email"}
            className="w-3/4 h-10 rounded-md border-2 text-white border-[#0daa93] bg-transparent bg-[#0DAA93] bg-opacity-10 p-2 "
          ></input>
          <input
            name="from_phone"
            placeholder="phone number"
            type={"text"}
            className="w-3/4 h-10 rounded-md border-2 text-white border-[#0daa93] bg-transparent bg-[#0DAA93] bg-opacity-10 p-2 "
          ></input>
          <textarea
            name="message"
            placeholder="Details"
            className="w-3/4 min-h-[200px] rounded-md border-2 text-white resize-none align-text-top border-[#0daa93] bg-transparent bg-[#0DAA93] bg-opacity-10 p-2 "
          ></textarea>
          <button
            type="submit"
            value="Send"
            className=" w-3/4 h-12 rounded-md border-2 text-white border-[#0daa93]  bg-[#0DAA93]  p-2 "
          >
            Send
          </button>
        </form>
        <div className="flex-1"></div>
        <div className="w-full h-16  flex flex-row items-center justify-center space-x-4 mt-auto pb-6">
          <a href="https://wa.me/00919686343315">
            <img id="media" src="/whatsapp.png" className=" w-8"></img>
          </a>
          <a href="http://www.twitter.com/0xmetastart">
            <img id="media" src="/twitter.png" className=" w-8"></img>
          </a>
          <a href="mailto:Hi@metastart.in">
            <img id="media" src="/email.png" className=" w-8"></img>
          </a>
          <a href="https://www.instagram.com/metastart.in/">
            <img id="media" src="/insta.png" className=" w-8"></img>
          </a>
        </div>
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}
