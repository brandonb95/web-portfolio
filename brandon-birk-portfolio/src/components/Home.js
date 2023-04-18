import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "animate.css";
import Header from "./Header";
import About from "./About";
import Works from "./Works";
import Contact from "./Contact";
import ScrollButton from "./ScrollButton";

const Home = () => {
  const restPath = "http://localhost/brandonbirk/wp-json/wp/v2/pages/6?_embed";
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setData(data);
        setLoadStatus(true);
      } else {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath]);

  useEffect(() => {
    // Wait 1 second and then scroll to the hash
    const timeoutId = setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 2000);

    // Wait for NavbarPostPage to mount before scrolling to the hash
    const observer = new MutationObserver(() => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  // let the bubbles of home be moved on mouse drag

  // for dragging bubbles
  const [dragging, setDragging] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const bubbleRefs = useRef(Array(20).fill(null));
  const [draggingIndex, setDraggingIndex] = useState(null);

  const setBubbleRef = (index) => (element) => {
    bubbleRefs.current[index] = element;
  };

  const handleMouseDown = (event, index) => {
    setDragging(true); // set dragging to true
    setDraggingIndex(index);
    const { pageX, pageY } = event;
    const bubble = bubbleRefs.current[index - 1];
    const { offsetLeft, offsetTop } = bubble;
    setCoordinates({ x: pageX - offsetLeft, y: pageY - offsetTop });
  };

  // Generate a random number between 0 and max
  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };

  const handleMouseMove = (event) => {
    if (draggingIndex !== null && dragging) {
      const { pageX, pageY } = event;
      const bubble = bubbleRefs.current[draggingIndex - 1];
      bubble.style.left = pageX - coordinates.x + "px";
      bubble.style.top = pageY - coordinates.y + "px";

      // check if bubble is outside viewport
      const boundingRect = bubble.getBoundingClientRect();
      const isOutsideLeft = boundingRect.left < 0;
      const isOutsideTop = boundingRect.top < 0;
      const isOutsideRight = boundingRect.right > window.innerWidth;
      const isOutsideBottom = boundingRect.bottom > window.innerHeight;
      if (isOutsideLeft || isOutsideTop || isOutsideRight || isOutsideBottom) {
        bubble.style.display = "none";
      } else {
        bubble.style.display = "block";
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(false); // set dragging to false
    setDraggingIndex(null);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <>
      {isLoaded ? (
        <>
          <header id="masthead" className="site-header">
            <Header />

            <article id="home" className="landing-banner">
              <div className="bubbles">
                {[...Array(20)].map((_, i) => (
                  <span
                    key={i}
                    style={{
                      "--i": i + 1,
                      left: `${getRandomNumber(window.innerWidth - 30)}px`,
                    }}
                    ref={(ref) => (bubbleRefs.current[i] = ref)}
                    onMouseDown={(event) => handleMouseDown(event, i + 1)}
                  ></span>
                ))}
              </div>

              <h1 className="landing-title animate__animated animate__bounceIn">
                {restData.acf.heading}
              </h1>
              <h2 className="landing-subheading animate__animated animate__bounceIn">
                {restData.acf.subheading}
              </h2>
            </article>
          </header>

          <article id="about">
            <About />
          </article>
          <article id="works">
            <Works />
          </article>
          <article id="contact">
            <Contact />
          </article>

          <ScrollButton />
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default Home;
