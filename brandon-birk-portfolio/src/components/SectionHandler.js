import React, { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";

const SectionHandler = () => {
  const circlesRef = {
    home: useRef(null),
    about: useRef(null),
    works: useRef(null),
    contact: useRef(null),
  };

  const [activeCircle, setActiveCircle] = useState("home");

  const handleButtonClick = (section) => {
    setActiveCircle(section);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(entry.target.dataset.section);
            setActiveCircle(entry.target.dataset.section);
          }
        });
      },
      {
        rootMargin: "-50px 0px -50px 0px",
        threshold: 0.2,
      }
    );

    Object.values(circlesRef).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    observer.observe(document.getElementById("home"));
    observer.observe(document.getElementById("about"));
    observer.observe(document.getElementById("works"));
    observer.observe(document.getElementById("contact"));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="circles">
      <a href="#home" aria-label="Home Section">
        <div
          ref={circlesRef.home}
          className={`circle home ${activeCircle === "home" ? "active" : ""}`}
          onClick={() => handleButtonClick("home")}
          data-section="home"
        ></div>
      </a>
      <a href="#works" aria-label="Works Section">
        <div
          ref={circlesRef.works}
          className={`circle works ${activeCircle === "works" ? "active" : ""}`}
          onClick={() => handleButtonClick("works")}
          data-section="works"
        ></div>
      </a>
      <a href="#about" aria-label="About Section">
        <div
          ref={circlesRef.about}
          className={`circle about ${activeCircle === "about" ? "active" : ""}`}
          onClick={() => handleButtonClick("about")}
          data-section="about"
        ></div>
      </a>
      <a href="#contact" aria-label="Contact Section">
        <div
          ref={circlesRef.contact}
          className={`circle contact ${
            activeCircle === "contact" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("contact")}
          data-section="contact"
        ></div>
      </a>
    </div>
  );
};

export default SectionHandler;
