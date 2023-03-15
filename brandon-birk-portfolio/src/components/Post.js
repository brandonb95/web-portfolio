import React from 'react'
import { Link } from 'react-router-dom';

function Post({ post, imagePath }) {
  const { acf, content, id } = post;

  return (
    <div className="single-project" id={`post-${id}`}>
      <h3 className="project-title">{acf.title}</h3>
      <div
        className="entry-content"
        dangerouslySetInnerHTML={{ __html: content.rendered }}
      ></div>
      <img src={post.acf.cover.url} alt={post.acf.cover.alt}></img>
      <p>{acf.excerpt}</p>
      <Link to={`/posts/${post.id}`}>Go to Another Page</Link>
      

    </div>
  );
}

export default Post;
