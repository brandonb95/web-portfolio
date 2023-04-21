import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "animate.css";
import Header from "./Header";
import About from "./About";
import Works from "./Works";
import Contact from "./Contact";
import ScrollButton from "./ScrollButton";
import Arrow from "./Arrow";

const Home = () => {
  const restPath = "http://localhost/brandonbirk/wp-json/wp/v2/pages/6?_embed";
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  const anchorRef = useRef(null);

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
  const bubbleRefs = useRef(Array(50).fill(null));
  const [draggingIndex, setDraggingIndex] = useState(null);

  const setBubbleRef = (index) => (element) => {
    bubbleRefs.current[index] = element;
  };

  const handleMouseDown = useCallback((event, index) => {
    setDragging(true); // set dragging to true
    setDraggingIndex(index);
    const { pageX, pageY } = event;
    const bubble = bubbleRefs.current[index - 1];
    const { offsetLeft, offsetTop } = bubble;
    setCoordinates({ x: pageX - offsetLeft, y: pageY - offsetTop });
  }, []);

  // Generate a random number between 0 and max
  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };

  const handleMouseMove = useCallback(
    (event) => {
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
        if (
          isOutsideLeft ||
          isOutsideTop ||
          isOutsideRight ||
          isOutsideBottom
        ) {
          bubble.style.display = "none";
        } else {
          bubble.style.display = "block";
        }
      }
    },
    [coordinates, dragging, draggingIndex]
  );

  // Functions to move bubbles around
  const handleMouseUp = useCallback(() => {
    setDragging(false); // set dragging to false
    setDraggingIndex(null);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const bubbleMouseDownHandlers = useMemo(() => {
    return bubbleRefs.current.map(
      (_, i) => (event) => handleMouseDown(event, i + 1)
    );
  }, [handleMouseDown]);

  const bubbleMouseMoveHandlers = useMemo(() => {
    return bubbleRefs.current.map(
      (_, i) => (event) => handleMouseMove(event, i + 1)
    );
  }, [handleMouseMove]);

  const bubbleMouseUpHandlers = useMemo(() => {
    return bubbleRefs.current.map((_, i) => () => handleMouseUp(i + 1));
  }, [handleMouseUp]);

  const positions = useMemo(() => {
    return [...Array(20)].map(() => ({
      left: `${getRandomNumber(window.innerWidth - 30)}px`,
      top: `${getRandomNumber(window.innerHeight - 30)}px`,
    }));
  }, []);

  // Cycle through subheading text
  const subheadingValues = [
    "Frontend Developer",
    "UX Designer",
    "Creative Enthusiast",
    "Spider-Man Fanatic",
  ];

  const [subheadingIndex, setSubheadingIndex] = useState(0);
  const [subheadingChanged, setSubheadingChanged] = useState(false);
  const [subheadingAnimating, setSubheadingAnimating] = useState(false);

  // Interval to change text
  useEffect(() => {
    const interval = setInterval(() => {
      setSubheadingAnimating("bounceOut");
      setTimeout(() => {
        setSubheadingIndex((subheadingIndex + 1) % subheadingValues.length);
        setSubheadingChanged(true);
        setSubheadingAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [subheadingIndex, subheadingChanged]);

  useEffect(() => {
    if (subheadingChanged) {
      setSubheadingAnimating(true);
    } else {
      setSubheadingAnimating(false);
    }
  }, [subheadingChanged]);

  return (
    <>
      {isLoaded ? (
        <>
          <header id="masthead" className="site-header">
            <Header />

            <article id="home" className="landing-banner">
              <div className="bubbles">
                {positions.map((position, i) => (
                  <span
                    key={i}
                    style={{
                      "--i": i + 1,
                      left: position.left,
                      top: position.top,
                    }}
                    ref={setBubbleRef(i)}
                    onMouseDown={bubbleMouseDownHandlers[i]}
                  ></span>
                ))}
              </div>

              <h1 className="landing-title animate__animated animate__bounceIn">
                {restData.acf.heading}
              </h1>

              <h2
                className={`landing-subheading animate__animated ${
                  subheadingAnimating === "bounceOut"
                    ? "animate__bounceOut"
                    : "animate__bounceIn"
                }`}
              >
                {subheadingValues[subheadingIndex]}
              </h2>
            </article>

            <Arrow />
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
