import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css/animate.min.css";

function Post({ post, imagePath }) {
  const { acf, content, id } = post;

  // initialize the animate-on-scroll
  AOS.init({
    duration: 1000, // set the animation duration
    once: true, // only animate once per viewport on page load
  });

  return (
    <div
      className="single-project"
      id={`post-${id}`}
      data-aos="fade-down"
      data-aos-duration="1000"
    >
      <img
        className="project-image"
        src={post.acf.cover.url}
        alt={post.acf.cover.alt}
      ></img>
      <div className="project-text-container">
        <h3 className="project-title">{acf.title}</h3>
        <p className="project-excerpt">{acf.excerpt}</p>
        <div className="tools-used">
          {Array.isArray(acf.tools_used_home) ? (
            acf.tools_used_home.map((toolObj, index) => (
              <p key={index}>{toolObj.tool}</p>
            ))
          ) : (
            <p>{acf.tools_used_home ? acf.tools_used_home.tool : "No tools"}</p>
          )}
        </div>
        <div className="project-button">
          <Link to={`/works/${post.slug}`}>Read More</Link>
        </div>
      </div>
    </div>
  );
}

export default Post;
