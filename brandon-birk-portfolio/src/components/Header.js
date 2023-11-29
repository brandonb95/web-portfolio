import { useState, useEffect } from "react";
import Logo from "./Logo";

import Navbar from "./Navbar";

const Header = () => {
  // Mobile Nav Settings
  const [navOpen, setNavOpen] = useState(false);

  const showHideNav = () => {
    setNavOpen(!navOpen);
  };

  const isDesktop = (e) => {
    if (e.matches) {
      setNavOpen(false);
    }
  };

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addEventListener("change", isDesktop);
    return () => mediaQuery.removeEventListener("change", isDesktop);
  }, []);

  return (
    <header className={navOpen ? "show" : undefined}>
      <a href="/" aria-label="Home">
        <Logo />
      </a>
      {/* <div className="logo-wrapper"></div> */}
      <button
        className="btn-main-nav"
        onMouseDown={(e) => {
          e.preventDefault();
        }}
        onClick={showHideNav}
      >
        <span className="hamburger-icon btn-main-nav">
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </span>
        <span className="sr-only">Menu</span>
      </button>

      <Navbar handleShowHideNav={showHideNav} />
    </header>
  );
};

export default Header;
