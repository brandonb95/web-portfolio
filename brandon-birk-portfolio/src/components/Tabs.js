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
            {restData.acf.development_1 && (
              <p className="project-page-desc-dev">
                {restData.acf.development_1}
              </p>
            )}

            {restData.acf.code_1 && (
              <pre className="project-page-desc-dev code-container">
                <code>{restData.acf.code_1}</code>
              </pre>
            )}

            {restData.acf.development_2 && (
              <p className="project-page-desc-dev">
                {restData.acf.development_2}
              </p>
            )}

            {restData.acf.code_2 && (
              <pre className="project-page-desc-dev code-container">
                <code>{restData.acf.code_2}</code>
              </pre>
            )}

            {restData.acf.development_3 && (
              <p className="project-page-desc-dev">
                {restData.acf.development_3}
              </p>
            )}
          </div>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <div className="block-3">
            {restData.acf.design_1 && (
              <p className="project-page-desc-design">
                {restData.acf.design_1}
              </p>
            )}

            {restData.acf.image_2.url && (
              <a
                href="#proj-image2-lightbox"
                className="lightbox-container-image3"
              >
                <img
                  className="project-page-image3"
                  src={restData.acf.image_2.url}
                  alt={restData.acf.image_2.alt}
                />
              </a>
            )}

            {restData.acf.image_2.url && (
              <h3 className="image-click">Click on image to enhance</h3>
            )}

            <a
              href="#inspiration"
              className="lightbox"
              id="proj-image2-lightbox"
            >
              <span
                style={{
                  backgroundImage: `url(${restData.acf.image_2.url})`,
                }}
              ></span>
            </a>
            {restData.acf.design_1 && (
              <p className="project-page-desc-design">
                {restData.acf.design_2}
              </p>
            )}

            {restData.acf.image_3.url && (
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
            )}
            {restData.acf.image_3.url && (
              <h3 className="image-click">Click on image to enhance</h3>
            )}
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

            {restData.acf.design_3 && (
              <p className="project-page-desc-design">
                {restData.acf.design_3}
              </p>
            )}
          </div>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <div className="block-3">
            {restData.acf.outcomes_1 && (
              <p className="project-page-desc-dev">{restData.acf.outcomes_1}</p>
            )}

            {restData.acf.outcomes_2 && (
              <p className="project-page-desc-dev">{restData.acf.outcomes_2}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
