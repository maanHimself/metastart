import React, { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";

// import "./SmoothScroll.css";
import useWindowSize from "../../hooks/useWindowSize";
import { FC } from "react";

type scmoothprops = {};

// const SmoothScroll: FC<scmoothprops> = (props: scmoothprops) => {
//   // 1.
//   const windowSize = useWindowSize();

//   //2.
//   const scrollingContainerRef = useRef(null);

//   // 3.
//   const data = {
//     ease: 0.1,
//     current: 0,
//     previous: 0,
//     rounded: 0,
//   };

//   // 4.
//   useEffect(() => {
//     setBodyHeight();
//   }, [windowSize.height]);

//   const setBodyHeight = () => {
//     document.body.style.height = `${
//       scrollingContainerRef.current.getBoundingClientRect().height
//     }px`;
//   };

//   // 5.
//   useEffect(() => {
//     requestAnimationFrame(() => smoothScrollingHandler());
//   }, []);

//   const smoothScrollingHandler = () => {
//     data.current = window.scrollY;
//     data.previous += (data.current - data.previous) * data.ease;
//     data.rounded = Math.round(data.previous * 100) / 100;

//     scrollingContainerRef.current.style.transform = `translateY(-${data.previous}px)`;

//     // Recursive call
//     requestAnimationFrame(() => smoothScrollingHandler());
//   };

//   return (
//     <div className="parent">
//       <div ref={scrollingContainerRef}>{props.children}</div>
//     </div>
//   );
// };
const SmoothScroll: FC<scmoothprops> = (props: scmoothprops) => {
  const options = {
    damping: 0.07,
  };

  useEffect(() => {
    Scrollbar.init(document.body, options);

    return () => {
      if (Scrollbar) Scrollbar.destroy(document.body);
    };
  }, []);

  return null;
};

export default SmoothScroll;
