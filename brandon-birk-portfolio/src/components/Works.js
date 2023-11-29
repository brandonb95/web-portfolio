import { useState, useEffect } from "react";
import Post from "./Post";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css/animate.min.css";

const Works = () => {
  const restPath =
    "https://brandonbirk.ca/portfolio-backend/wp-json/wp/v2/brandonbirk-works?_embed&acf_format=standard";
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);
  const [imagePath, setImagePath] = useState(null);

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

  // Update the image path when needed
  useEffect(() => {
    if (restData.length > 0 && restData[0].acf.cover) {
      const newImagePath = restData[0].acf.cover.url;
      setImagePath(newImagePath);
    }
  }, [restData]);

  // initialize the animate-on-scroll
  AOS.init({
    duration: 1000, // set the animation duration
    once: true, // only animate once per viewport on page load
  });

  const postOrder = [59, 57, 130, 50];

  return (
    <>
      {isLoaded && restData.length > 0 ? (
        <article className="work-container">
          {postOrder.map((postId) => {
            const post = restData.find((item) => item.id === postId);
            if (post) {
              return <Post key={post.id} post={post} imagePath={imagePath} />;
            } else {
              return null; // Handle missing posts gracefully
            }
          })}
        </article>
      ) : (
        <h2>Works Loading...</h2>
      )}
    </>
  );
};

export default Works;
