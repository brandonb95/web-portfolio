import React from 'react'

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
      <button className="read-more-button">Read More</button>
    </div>
  );
}

export default Post;
