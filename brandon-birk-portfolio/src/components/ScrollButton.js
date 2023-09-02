import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import "@fortawesome/fontawesome-free/css/all.min.css";

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

    // Clear the anchor from the URL
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div className="to-top" aria-label="To Top">
      {visible && (
        <div className="icon-container" onClick={scrollToTop}>
          <FaArrowCircleUp className="icon" />
        </div>
      )}
    </div>
  );
};

export default ScrollButton;
