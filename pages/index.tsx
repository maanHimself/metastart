import AboutSection from "../components/AboutSection/AboutSection";
import ThreeContainer from "./ThreeComp";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";
// @ts-ignore
import Typewriter, { TypewriterClass } from "typewriter-effect";
import Services from "../components/ServicesSection";
import Head from "next/head";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  // let services = useRef(null);

  const [entered, setEntered] = useState(false);
  const [clickAnything, setClickAnything] = useState<TypewriterClass>();

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("keydown", () => setEntered(true));
    window.addEventListener("mousedown", () => setEntered(true));
    window.addEventListener("touchstart", () => setEntered(true));

    return () => {
      window.removeEventListener("keydown", () => setEntered(true));
      window.removeEventListener("mousedown", () => setEntered(true));
      window.removeEventListener("touchstart", () => setEntered(true));
    };
  }, []);

  useEffect(() => {
    if (clickAnything) {
      clickAnything
        .deleteAll(1)
        .callFunction((state) => {
          state.elements.cursor.style.display = "none";
        })
        .start();
    }
  }, [entered]);

  //make the progress disapear
  const porgress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (porgress.current != null) porgress.current.style.opacity = "0%";
  });

  const { ref: services, inView: myElementIsVisible } = useInView();

  const form = useRef() as React.MutableRefObject<HTMLFormElement>;

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const StartRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToTop = () => {
    StartRef.current?.scrollIntoView({ behavior: "smooth" });
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
    <>
      <div ref={StartRef} />
      <ThreeContainer></ThreeContainer>
      {/* <SmoothScroll /> */}
      <div className="-z-10 h-full w-full text-black flex justify-center items-center text-lg absolute">
        <div
          ref={porgress}
          className="w-full h-full fixed  -z-10  bg-[#000000]"
          id="loadingBg"
        ></div>
        <Typewriter
          onInit={(typewriter) => {
            setClickAnything(typewriter);

            typewriter
              .callFunction((state) => {
                state.elements.container.style.fontSize = "170%";
                state.elements.container.style.color = "#FF0052";
                state.elements.container.style.backgroundColor = "#000000";
                state.elements.container.style.textAlign = "center";
                state.elements.container.style.justifyContent = "center";
                state.elements.container.style.alignItems = "center";
              })
              .pauseFor(250)
              .typeString("Click to get MetaStarted")
              .start();
          }}
          options={{
            delay: 10,
          }}
        />
      </div>
      <div
        id="content"
        className="content h-full w-full flex flex-col items-center justify-center m-0 p-6 pt-0 pb-0 "
      >
        <Head>
          <title>Metastart</title>
          <link rel="icon" href="/thumbnail.png" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <div className="h-[80vh] w-full flex flex-col items-center justify-center ">
          {/* old logo */}
          {/* <img
            id="logo"
            src="/logo.png"
            className="inline-block opacity-0 md:w-2/3 -translate-y-20 "
          ></img> */}
          {/* new logo */}
          <div className=" md:w-3/5 max-w-4xl w-3/3 flex flex-col justify-center items-center">
            <img
              id="donut"
              src="/donut.png"
              className="inline-block w-[45%] mb-4  -z-10 opacity-0 p-8"
            ></img>
            <img
              id="logo"
              src="/metastart.png"
              className="inline-block opacity-0 w-full "
            ></img>
          </div>
          {/* <AwesomeButton
            type="primary"
            size="large"
            onPress={() => {
              scrollToBottom();
            }}
          >
            Contact us
          </AwesomeButton> */}
        </div>

        <div className="w-full flex flex-row flex-wrap justify-center items-center ">
          <img
            src="retro1.jpg"
            id="services"
            className="mb-4 mt-4 md:w-1/4 w-3/4 opacity-0"
          />
        </div>
        <Services />
        {/* <CircleServices /> */}

        <div className="w-full flex flex-row flex-wrap justify-center items-center mt-28">
          <img
            src="retro1.jpg"
            id="about"
            className="mb-4 mt-4 md:w-1/4 w-3/4 opacity-0"
          />
        </div>
        <p className=" pt-6 pb-0 mt-10 text-white font-main md:text-2xl text-[20px] md:max-w-7xl text-center">
          We&apos;re web3 natives, having worked since its early stages.
          Bringing diverse talent under one roof towards a share goal for
          democratizing the world, and taking down all things fundamentally
          wrong with web2. We&apos;re sort of like the Robinhood for web3.
          Taking back power from the biggies, and putting it back in your hands
          !
        </p>
        {/* <AboutSection
          src="/goal.png"
          id="goal"
          titel="MISSION"
          desc="Accelerating the migration of Businesses and Creators towards the web3 sphere."
        />

        <AboutSection
          src="/vision.png"
          id={"vision"}
          reverse
          titel="VISION"
          desc="Building a democratic and Decentralised World."
        /> */}

        <p
          className=" pt-24 pb-0 mt-10 text-white font-main md:text-6xl text-4xl"
          style={{ scrollSnapAlign: "start" }}
        >
          PROJECTS
        </p>
        <div className="flex flex-col max-w-6xl md:flex-row md:justify-around w-full  md:space-x-4 mt-8 text-white font-main">
          <div className="flex flex-col items-center justify-center mb-10">
            <img
              id="indie"
              src="/indie.png"
              className="opacity-0 w-3/5 m-0 "
            ></img>
            <p className=" text-center right-0 text-4xl  mt-4">Indie Company</p>
            <p className=" text-center right-0 text-2xl m-2">
              Our own crypto enabled e-commerce
            </p>
          </div>
          <div className="flex flex-col-reverse items-center justify-center md:flex-col ">
            <div>
              <p className=" text-center right-0 text-4xl mt-4">Sky Deck</p>
              <p className=" text-center right-0 text-2xl m-2 md:mb-8 ">
                Our own Nft marketplace based on polygon
              </p>
            </div>
            <img
              id="skyDeck"
              src="/skyDeck.png"
              className="opacity-0 w-3/5 m-0"
            ></img>
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
          <img
            id="team6"
            src="/team6.png"
            className="md:h-56 h-28 mt-10 opacity-0 m-4"
          ></img>
          <img
            id="team7"
            src="/team7.png"
            className="md:h-56 h-28 mt-10 opacity-0 m-4"
          ></img>
        </div>

        <div className="h-fit w-full flex flex-col items-center justify-center font-main space-y-6">
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
          {/* <p className="w-3/4 text-[20px] align-middle text-center text-white">
            PS: We wanted to give you a taste of the Metaverse hence the theme,
            not cause we can’t afford an intense UX website :P
          </p> */}
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
    </>
  );
}
