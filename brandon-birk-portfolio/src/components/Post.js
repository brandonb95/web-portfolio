import React from 'react'
import { Link } from 'react-router-dom';

function Post({ post, imagePath }) {
  const { acf, content, id } = post;

  return (
    <div className="single-project" id={`post-${id}`}>
      <h3 className="project-title">{acf.title}</h3>
   
      <img className="project-image" src={post.acf.cover.url} alt={post.acf.cover.alt}></img>
      <p className="project-excerpt">{acf.excerpt}</p>
      
      <div className='project-button'><Link to={`/works/${post.slug}`}>Read More</Link></div>
      

    </div>
  );
}

export default Post;
