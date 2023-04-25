import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";

const SectionHandler = () => {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    function handleScroll() {
      const aboutSection = document.querySelector(".about");
      const workSection = document.querySelector(".work");
      const contactSection = document.querySelector(".contact");
      const indicator = document.querySelector(".indicator");
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollTop < aboutSection.offsetTop) {
        setActiveSection("about");
        indicator.style.top = 0;
      } else if (
        scrollTop >= aboutSection.offsetTop &&
        scrollTop < workSection.offsetTop
      ) {
        setActiveSection("work");
        indicator.style.top = aboutSection.offsetTop + "px";
      } else if (
        scrollTop >= workSection.offsetTop &&
        scrollTop < contactSection.offsetTop
      ) {
        setActiveSection("contact");
        indicator.style.top = workSection.offsetTop + "px";
      } else {
        setActiveSection("contact");
        indicator.style.top = contactSection.offsetTop + "px";
      }
    }

    const debouncedHandleScroll = debounce(handleScroll, 10);

    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  function handleButtonClick(section) {
    const sectionElement = document.querySelector(`.${section}`);
    window.scrollTo({ top: sectionElement.offsetTop, behavior: "smooth" });
    setActiveSection(section);
  }

  return (
    <div className="circles">
      <a href="#home" aria-label="Home Section">
        <div
          className={`circle about ${
            activeSection === "about" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("about")}
        ></div>
      </a>
      <a href="#about" aria-label="About Section">
        <div
          className={`circle work ${activeSection === "work" ? "active" : ""}`}
          onClick={() => handleButtonClick("work")}
        ></div>
      </a>
      <a href="#works" aria-label="Works Section">
        <div
          className={`circle contact ${
            activeSection === "contact" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("contact")}
        ></div>
      </a>
      <a href="#contact" aria-label="Contact Section">
        <div className="circle indicator"></div>
      </a>
    </div>
  );
};

export default SectionHandler;
