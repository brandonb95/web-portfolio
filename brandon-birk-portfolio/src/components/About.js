import { useState, useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css/animate.min.css";
import lottie from "lottie-web";

const About = () => {
  const restPath = "http://localhost/brandonbirk/wp-json/wp/v2/posts/13?_embed";
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false); // add state variable for overlay display
  const [overlayStyle, setOverlayStyle] = useState({
    width: 0,
    opacity: 0,
  });
  const aboutContainer = useRef(null);

  // initialize the animate-on-scroll
  AOS.init({
    duration: 1000, // set the animation duration
    once: true, // only animate once per viewport on page load
  });

  useEffect(() => {
    // Set the initial overlay style to { width: 0, opacity: 0 }.
    setOverlayStyle({ width: "100%", opacity: 0.8 });

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
    if (aboutContainer.current) {
      console.log("Container ref in useEffect:", aboutContainer.current);

      const loadAnimation = async () => {
        try {
          const animationContainer = aboutContainer.current;

          const animationData = require("../spiderman.json");

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
        <article id={`post-${restData.id}`}>
          {/* <div className="entry-content animate__animated animate__lightSpeedInRight" dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                </div> */}

          <div
            className="image-container"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <img
              src={restData.acf.profile.url}
              alt={restData.acf.profile.alt}
            />
            {/* <div className="overlay" style={{ ...overlayStyle }} /> */}
          </div>
          <div
            className="about-description"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            {/* <div className="about-animation" ref={aboutContainer}></div> */}

            <h3 className="about-title">
              An enthusiastic Front-end Developer from Vancouver, Canada
            </h3>
            <p>{restData.acf.description}</p>
          </div>
        </article>
      ) : (
        <h2>About loading...</h2>
      )}
    </>
  );
};

export default About;
