import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Tabs = () => {
  const [toggleState, setToggleState] = useState(1);

  const { slug } = useParams();
  const restPath = `http://localhost/brandonbirk/wp-json/wp/v2/brandonbirk-works?slug=${slug}&_embed&acf_format=standard`;
  const [restData, setData] = useState({});
  const [isLoaded, setLoadStatus] = useState(false);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setData(data[0]);
        setLoadStatus(true);
      } else {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          DEVELOPMENT
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          DESIGN
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          OVERALL THOUGHTS
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <div className="block-3">
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

            <h3 className="image-click">Click on image to enhance</h3>

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
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Content 2</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            voluptatum qui adipisci.
          </p>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2>Content 3</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
            nostrum rerum laudantium totam unde adipisci incidunt modi alias!
            Accusamus in quia odit aspernatur provident et ad vel distinctio
            recusandae totam quidem repudiandae omnis veritatis nostrum
            laboriosam architecto optio rem, dignissimos voluptatum beatae
            aperiam voluptatem atque. Beatae rerum dolores sunt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
