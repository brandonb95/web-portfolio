import React, { useState, useRef, useEffect } from "react";
import "animate.css";
import Header from "./Header";
import About from "./About";
import Works from "./Works";
import Contact from "./Contact";
import ScrollButton from "./ScrollButton";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import lottie from "lottie-web";

const Home = () => {
  const restPath = "http://localhost/brandonbirk/wp-json/wp/v2/pages/6?_embed";
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);
  const container = useRef(null);

  const [subheadingValues] = useTypewriter({
    words: [
      "Front-End Web Developer",
      "UX / UI Designer",
      "Creative Enthusiast",
      "Spider-Man Fanatic",
    ],
    loop: {},
    typeSpeed: 30,
    deleteSpeed: 30,
  });

  useEffect(() => {
    console.log("Container ref before useEffect:", container.current);

    const fetchData = async () => {
      try {
        const response = await fetch(restPath);
        if (response.ok) {
          const data = await response.json();
          setData(data);
          setLoadStatus(true);
        } else {
          setLoadStatus(false);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoadStatus(false);
      }
    };

    fetchData();
  }, [restPath]);

  useEffect(() => {
    if (container.current) {
      console.log("Container ref in useEffect:", container.current);

      const loadAnimation = async () => {
        try {
          const animationContainer = container.current;

          const animationData = require("../me_working.json");

          lottie.loadAnimation({
            container: animationContainer,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animationData,
          });
        } catch (error) {
          console.error("Error loading Lottie animation:", error);
        }
      };

      loadAnimation();
    }
  }, [isLoaded]);

  return (
    <>
      {isLoaded ? (
        <>
          <Header />

          <article id="home" className="landing-banner" data-section="home">
            <div className="landing-container animate__animated animate__bounceIn">
              <h1 className="landing-title ">{restData.acf.heading}</h1>

              <h2 className="landing-subheading">
                {" "}
                {subheadingValues}
                <Cursor cursorStyle="|" />
              </h2>

              <p className="landing-description animate__animated animate__bounceIn">
                {restData.acf.landing_description}
              </p>
              <div
                className="animation animate__animated animate__bounceIn"
                ref={container}
              ></div>
            </div>
          </article>

          <article id="works" data-section="works">
            <Works />
          </article>

          <article id="about" data-section="about">
            <About />
          </article>

          <article id="contact" data-section="contact">
            <Contact />
          </article>

          <ScrollButton />
          {/* <SectionHandler /> */}
        </>
      ) : (
        <PacmanLoader
          color={"#DD7157"}
          loading={true}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </>
  );
};

export default Home;
