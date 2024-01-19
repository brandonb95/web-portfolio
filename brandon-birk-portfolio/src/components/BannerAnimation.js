import React, { useState, useEffect } from "react";
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5, faCss3 } from "@fortawesome/free-brands-svg-icons";
import { FaJs } from "react-icons/fa";
import { ReactComponent as WordPressIcon } from "../WordPress.svg";
import { ReactComponent as WoooCommerceIcon } from "../WooCommerce.svg";
import { ReactComponent as AdobeXDIcon } from "../AdobeXD.svg";

import { faReact } from "@fortawesome/free-brands-svg-icons";

const BannerAnimation = () => {
  return (
    <div
      className="specialties-container"
      data-aos="slide-right"
      data-aos-duration="1000"
    >
      <div
        className="icon-container"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="1000"
      >
        <div className="specialties-icon-container">
          <FontAwesomeIcon icon={faHtml5} />
          <p>HTML5</p>
        </div>
        <div className="specialties-icon-container">
          <FontAwesomeIcon icon={faCss3} />
          <p>CSS3</p>
        </div>
        <div className="specialties-icon-container">
          <FaJs />
          <p>JavaScript</p>
        </div>
        <div className="specialties-icon-container">
          <FontAwesomeIcon icon={faReact} />
          <p>React</p>
        </div>
        <div className="specialties-icon-container">
          <WordPressIcon />
          <p>WordPress</p>
        </div>
        <div className="specialties-icon-container">
          <WoooCommerceIcon />
          <p>WooCommerce</p>
        </div>
        <div className="specialties-icon-container">
          <AdobeXDIcon />
          <p>Adobe XD</p>
        </div>
      </div>
    </div>
  );
};

export default BannerAnimation;
