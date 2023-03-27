const RelatedPosts = ({ relatedPosts }) => {
    return (
      <section>
        <h2>Related Posts</h2>
        <ul>
          {relatedPosts.map(post => (
            <li key={post.id}>
              <a href={`/post/${post.slug}`}>{post.title.rendered}</a>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  export default RelatedPosts