import classNames from "classnames";
import ThreeContainer from "./ThreeComp";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";
// @ts-ignore
import Typewriter, { TypewriterClass } from "typewriter-effect";
import Services from "../components/ServicesSection";
import Head from "next/head";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { teamMember } from "../components/teamMember";

export default function Home() {
  // let services = useRef(null);

  const [entered, setEntered] = useState(false);
  const [clickAnything, setClickAnything] = useState<TypewriterClass>();

  useEffect(() => {
    window.scrollTo(0, 0);
    scrollToTop();
    window.addEventListener("keydown", () => setEntered(true));
    window.addEventListener("mousedown", () => setEntered(true));
    window.addEventListener("touchstart", () => setEntered(true));
    // window.addEventListener("resize", () =>
    //   setDimensions({
    //     height: window.innerHeight,
    //     width: window.innerWidth,
    //   })
    // );

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
      <div className="-z-10 h-full w-full text-black flex flex-col justify-end items-center text-lg fixed">
        <div
          ref={porgress}
          className="w-full h-full fixed -z-10  bg-[#000000]"
          id="loadingBg"
        ></div>
        <Typewriter
          onInit={(typewriter) => {
            setClickAnything(typewriter);
            typewriter
              .callFunction((state) => {
                state.elements.container.style.fontSize = "170%";
                state.elements.container.style.color = "#FF0052";
                // state.elements.container.style.backgroundColor = "#000000";
                state.elements.container.style.textAlign = "center";
                state.elements.container.style.justifyContent = "center";
                state.elements.container.style.alignItems = "center";
                state.elements.container.style.marginBottom = "20px";
                state.elements.container.style.lineHeight = "40px";
                state.elements.container.style.textShadow =
                  "-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff";
                // state.elements.container.style.webkitTextStrokeWidth = "3px";
                // state.elements.container.style.webkitTextStrokeColor = "black";
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
        className={
          "content h-full w-full flex flex-col items-center justify-center m-0 p-6 pt-0 pb-0 "
        }
      >
        <Head>
          <title>Metastart</title>
          <link rel="icon" href="/thumbnail.png" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <div className="h-[100vh] w-full flex flex-col items-center justify-center ">
          <div
            className="text-white lg:text-[120px] md:text-[120px] text-[15vw] absolute
             w-full max-w-6xl  break-words justify-center items-center text-center
              leading-none font-head"
            style={{ textShadow: "2px 3px 0 #FF0052, -2px -3px 0 #00FEEB" }}
          >
            KickStart your web3 journey with us.
          </div>
          <img
            id="donut"
            src="/donut.png"
            className="inline-block md:w-3/5 w-[90vw] max-w-sm  mb-4  -z-10 opacity-0 p-8"
          ></img>
          {/* <img
            id="logo"
            src="/metastart.png"
            className="inline-block md:w-2/5 w-2/4 "
          ></img> */}

          <div id="scrolldown" className="scrolldown-wrapper">
            <div className="scrolldown">
              <svg
                height="30"
                width="10"
                className="flex justify-center items-center"
              >
                <circle className="scrolldown-p1" cx="5" cy="15" r="2" />
                <circle className="scrolldown-p2" cx="5" cy="15" r="2" />
              </svg>
            </div>
            <p className="text-white text-lg">scroll down</p>
          </div>
        </div>

        <div className="w-full flex flex-row flex-wrap justify-center items-center ">
          <div className="h-16 w-full"></div>
          <img
            src="retro1.jpg"
            id="services"
            className="mb-4 mt-4 md:w-2/6 w-3/4 opacity-0"
          />
        </div>
        <Services />

        <div className="w-full flex flex-row flex-wrap justify-center items-center mt-28">
          <img
            src="retro1.jpg"
            id="about"
            className="mb-4 mt-4 md:w-2/6 w-3/4 opacity-0"
          />
        </div>
        <p className=" pt-6 pb-0 mt-10 text-white font-main md:text-2xl text-[20px] md:max-w-5xl text-center">
          We&apos;re web3 natives, having worked since its early stages.
          Bringing diverse talent under one roof towards a share goal for
          democratizing the world, and taking down all things fundamentally
          wrong with web2. We&apos;re sort of like the Robinhood for web3.
          Taking back power from the biggies, and putting it back in your hands
          !
        </p>

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
        <div className="grid grid-cols-3 grid-rows-3  justify-center align-middle items-center w-full max-w-7xl mt-4">
          {teamMember("team1")}
          {teamMember("team2")}
          {teamMember("team3")}
          {teamMember("team4")}
          {teamMember("team5")}
          {teamMember("team9")}
          {teamMember("team6")}
          {teamMember("team7")}
          {teamMember("team8")}
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
            <a href="https://wa.me/qr/YUDVJTVNUTAOP1">
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
