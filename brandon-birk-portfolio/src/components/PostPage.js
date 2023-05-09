import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderPostPage from "./HeaderPostPage";
import ScrollButton from "./ScrollButton";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css/animate.min.css";

const PostPage = () => {
  const { slug } = useParams();
  const restPath = `https://brandonbirk.ca/portfolio-backend/wp-json/wp/v2/brandonbirk-works?slug=${slug}&_embed&acf_format=standard`;
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  const [relatedPosts, setRelatedPosts] = useState([]);
  const [prevPost, setPrevPost] = useState("");
  const [nextPost, setNextPost] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setData(data[0]);
        setLoadStatus(true);

        // Get related posts
        const relatedPostsResponse = await fetch(
          `https://brandonbirk.ca/portfolio-backend/wp-json/wp/v2/brandonbirk-works?per_page=3&_embed&exclude=${data[0].id}`
        );
        if (relatedPostsResponse.ok) {
          const relatedPostsData = await relatedPostsResponse.json();
          setRelatedPosts(relatedPostsData);
        } else {
        }
      } else {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath]);

  // initialize the animate-on-scroll
  AOS.init({
    duration: 1000, // set the animation duration
    once: true, // only animate once per viewport on page load
  });

  return (
    <>
      {isLoaded ? (
        <>
          <HeaderPostPage />

          <article
            className="project-page-container"
            id={`post-${restData.id}`}
          >
            <h3
              className="project-page-title"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              {restData.acf.title}
            </h3>

            <section id="problems">
              <div className="block-1">
                <img
                  className="project-page-cover"
                  src={restData.acf.cover.url}
                  alt={restData.acf.cover.alt}
                  data-aos="fade-right"
                  data-aos-duration="1000"
                ></img>

                <p
                  className="project-page-desc1"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                >
                  {restData.acf.problem}
                </p>

                <p
                  className="project-link-1"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <a href={restData.acf.link_1.url} target="_blank">
                    {restData.acf.link_1.title}
                  </a>
                </p>

                <p
                  className="project-link-1"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <a href={restData.acf.link_2.url} target="_blank">
                    {restData.acf.link_2.title}
                  </a>
                </p>
              </div>
            </section>

            <section id="software-tools-used">
              <div
                className="block-2"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <a
                  href="#proj-image2-lightbox"
                  className="lightbox-container-image2"
                >
                  <img
                    className="project-page-image2"
                    src={restData.acf.image_2.url}
                    alt={restData.acf.image_2.alt}
                  ></img>
                </a>

                <a
                  href="#software-tools-used"
                  className="lightbox"
                  id="proj-image2-lightbox"
                >
                  <span
                    style={{
                      backgroundImage: `url(${restData.acf.image_2.url})`,
                    }}
                  ></span>
                </a>

                <p className="project-page-desc2">{restData.acf.tools_used}</p>

                <p className="project-page-desc3">
                  {restData.acf.tools_used_2}
                </p>
              </div>
            </section>

            <section id="inspiration">
              <div
                className="block-3"
                data-aos="fade-down"
                data-aos-duration="1000"
              >
                <a
                  href="#proj-image3-lightbox"
                  className="lightbox-container-image3"
                >
                  <img
                    className="project-page-image3"
                    src={restData.acf.image_3.url}
                    alt={restData.acf.image_3.alt}
                  ></img>
                </a>

                <a
                  href="#inspiration"
                  className="lightbox"
                  id="proj-image3-lightbox"
                >
                  <span
                    style={{
                      backgroundImage: `url(${restData.acf.image_3.url})`,
                    }}
                  ></span>
                </a>

                <p className="project-page-desc4">{restData.acf.inspiration}</p>
              </div>
            </section>

            <section id="examples">
              <div
                className="block-4"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <a
                  href="#proj-image4-lightbox"
                  className="lightbox-container-image4"
                >
                  <img
                    className="project-page-image4"
                    src={restData.acf.image_4.url}
                    alt={restData.acf.image_4.alt}
                  ></img>
                </a>

                <a
                  href="#examples"
                  className="lightbox"
                  id="proj-image4-lightbox"
                >
                  <span
                    style={{
                      backgroundImage: `url(${restData.acf.image_4.url})`,
                    }}
                  ></span>
                </a>

                <a
                  href="#proj-image5-lightbox"
                  className="lightbox-container-image5"
                >
                  <img
                    className="project-page-image5"
                    src={restData.acf.image_5.url}
                    alt={restData.acf.image_5.alt}
                  ></img>
                </a>

                <a
                  href="#examples"
                  className="lightbox"
                  id="proj-image5-lightbox"
                >
                  <span
                    style={{
                      backgroundImage: `url(${restData.acf.image_5.url})`,
                    }}
                  ></span>
                </a>

                <p className="project-page-desc5">{restData.acf.examples}</p>
              </div>
            </section>

            <section id="final-result">
              <div
                className="block-5"
                data-aos="fade-down"
                data-aos-duration="1000"
              >
                <a
                  href="#proj-image6-lightbox"
                  className="lightbox-container-image6"
                >
                  <img
                    className="project-page-image6"
                    src={restData.acf.image_6.url}
                    alt={restData.acf.image_6.alt}
                  ></img>
                </a>

                <a
                  href="#final-result"
                  className="lightbox"
                  id="proj-image6-lightbox"
                >
                  <span
                    style={{
                      backgroundImage: `url(${restData.acf.image_6.url})`,
                    }}
                  ></span>
                </a>

                <p className="project-page-desc6">
                  {restData.acf.final_result}
                </p>
              </div>
            </section>

            {relatedPosts.length > 0 && (
              <section id="related-posts">
                <h3>Check out one of my other projects:</h3>
                <ul>
                  {relatedPosts.map((post) => (
                    <li key={post.id}>
                      <a href={`/works/${post.slug}`}>{post.title.rendered}</a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          <ScrollButton />
        </>
      ) : (
        <h2></h2>
      )}
    </>
  );
};

export default PostPage;
