import React, { useState, useEffect } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update the current year when the component mounts
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer>
      <article className="footer-main">
        <p className="footer-desc">Copyright © Brandon Birk {currentYear}</p>
        <p className="icon-credit">
          Icons from{" "}
          <a href="https://icons8.com/icons" target="_blank">
            Icons8
          </a>
        </p>
      </article>
    </footer>
  );
};

export default Footer;
