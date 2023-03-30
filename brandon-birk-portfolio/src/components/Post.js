import React from 'react'
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "animate.css/animate.min.css";

function Post({ post, imagePath }) {
  const { acf, content, id } = post;

  // initialize the animate-on-scroll 
  AOS.init({
    duration: 1000, // set the animation duration
    once: true, // only animate once per viewport on page load
  });

  return (
    <div className="single-project" id={`post-${id}`} data-aos="fade-down" data-aos-duration="1000">
      <h3 className="project-title">{acf.title}</h3>
   
      <img className="project-image" src={post.acf.cover.url} alt={post.acf.cover.alt}></img>
      <p className="project-excerpt">{acf.excerpt}</p>
      <div className='project-button'><Link to={`/works/${post.slug}`}>Read More</Link></div>
      

    </div>
  );
}

export default Post;
