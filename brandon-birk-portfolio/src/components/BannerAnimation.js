import React, { useState, useEffect } from "react";
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5, faCss3 } from "@fortawesome/free-brands-svg-icons";

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
      </div>
    </div>
  );
};

export default BannerAnimation;
