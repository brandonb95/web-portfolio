import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css/animate.min.css";

const About = () => {
  const restPath = "http://localhost/brandonbirk/wp-json/wp/v2/posts/13?_embed";
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  // initialize the animate-on-scroll
  AOS.init({
    duration: 1000, // set the animation duration
    once: true, // only animate once per viewport on page load
  });

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
            ></img>
            <div className="overlay"></div>
          </div>

          <div
            className="about-description"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
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
