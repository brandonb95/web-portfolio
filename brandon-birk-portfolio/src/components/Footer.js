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
      </article>
    </footer>
  );
};

export default Footer;
