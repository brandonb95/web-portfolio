import React, { useState, useEffect } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update the current year when the component mounts
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer>
      <section className="footer-main">
        <p className="footer-desc">Copyright © Brandon Birk {currentYear}</p>
      </section>
    </footer>
  );
};

export default Footer;
