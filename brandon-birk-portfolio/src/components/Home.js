import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "animate.css";
import Header from "./Header";
import About from "./About";
import Works from "./Works";
import Contact from "./Contact";
import ScrollButton from "./ScrollButton";
import Arrow from "./Arrow";
import SectionHandler from "./SectionHandler";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Home = () => {
  const restPath = "http://localhost/brandonbirk/wp-json/wp/v2/pages/6?_embed";
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);
  const [subheadingIndex, setSubheadingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
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

  // Loading Spinner
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {isLoaded ? (
        <>
          <Header />

          <article id="home" className="landing-banner" data-section="home">
            <div className="landing-container">
              <h1 className="landing-title animate__animated animate__bounceIn">
                {restData.acf.heading}
              </h1>

              {/* <h2 className="landing-subheading">
                {" "}
                {subheadingValues}
                <Cursor cursorStyle="|" />
              </h2> */}

              <p className="landing-description animate__animated animate__bounceIn">
                {restData.acf.landing_description}
              </p>
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
          loading={loading}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </>
  );
};

export default Home;
