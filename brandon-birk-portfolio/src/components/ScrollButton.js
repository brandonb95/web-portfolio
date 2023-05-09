import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    if (isIOS()) {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <button className="to-top" aria-label="To Top">
      <FaArrowCircleUp
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      />
    </button>
  );
};

export default ScrollButton;
