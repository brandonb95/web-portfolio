import React from "react";
import { useRef } from "react";

const Arrow = () => {
  const anchorRef = useRef(null); // Get a reference to the anchor element

  const scrollToAnchor = () => {
    if (anchorRef.current) {
      anchorRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the anchor element
    }
  };

  return (
    <div className="arrow-container" onClick={scrollToAnchor}>
      <div className="arrow"></div>
    </div>
  );
};

export default Arrow;
