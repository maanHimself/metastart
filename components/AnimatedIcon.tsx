import { Controller, Scene } from "react-scrollmagic";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Tween, Timeline } from "react-gsap";
import Typewriter, { TypewriterClass } from "typewriter-effect";
import classNames from "classnames";

const Zoom = require("react-reveal/Zoom");

type props = {
  src: string;
  id: string;
  reverse?: boolean;
  desc: string;
};

const AnimatedIcon: FC<props> = (props: props) => {
  const [writer, _setWriter] = useState<TypewriterClass>();
  const ref = useRef<HTMLImageElement>(null);
  const writerRef = useRef<TypewriterClass | undefined>(writer);
  const desc = useRef<string>(props.desc);
  const [lock, setLock] = useState(0);

  const setWriter = (writer: TypewriterClass) => {
    writerRef.current = writer;
    _setWriter(writer);
  };

  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    type();
  }, [inView]);

  const onScroll = useCallback(() => {
    let bounds = ref.current?.getBoundingClientRect();
    if (bounds)
      if (
        bounds.top < window.innerHeight * 0.7 &&
        bounds.top > window.innerHeight * 0.2 &&
        !inView
      )
        setInView(true);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    desc.current = props.desc;
  }, [props.desc]);

  const type = () => {
    if (writer && lock < 1) {
      setLock(1);
      writer.typeString(props.desc).start();
    }
  };
  const untype = () => {
    if (writer && window.innerWidth > 768 && lock < 2) {
      setLock(1);
      writer
        .deleteAll(1)
        .callFunction((state) => {
          state.elements.cursor.style.display = "none";
        })
        .start()
        .callFunction((state) => {
          setLock(0);
        });
    }
  };

  const reverseClassName = props.reverse ? "left-0" : "right-0";
  return (
    <div
      className="md:w-[70vw] w-full relative"
      onMouseEnter={() => {
        if (window.innerWidth > 768) type();
      }}
    >
      <div
        className={classNames(
          " w-3/6 h-1/3 text-white top-1/2 absolute md:text-lg text-[18px]",
          reverseClassName
        )}
      >
        <Typewriter
          onInit={(typewriter) => {
            setWriter(typewriter);
            // if (window.innerWidth <= 768)
            //   typewriter.typeString(props.desc).start();
          }}
          options={{
            delay: 0.1,
            deleteSpeed: 1,
          }}
        />
      </div>
      <img
        src={props.src}
        id={props.id}
        ref={ref}
        className="mb-4 mt-4 opacity-0"
      />
    </div>
  );
};

export { AnimatedIcon };
