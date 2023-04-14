import { Link } from "react-router-dom";
import Logo from "./Logo";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css/animate.min.css";
import { useEffect } from "react";

const Navbar = ({ handleShowHideNav }) => {
  function closeNav(e) {
    if (window.innerWidth < 600) {
      handleShowHideNav();
    } else {
      e.target.blur();
    }
  }

  // initialize the animate-on-scroll
  useEffect(() => {
    function animateOnScroll() {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((element) => {
        if (window.innerWidth < 768) {
          AOS.init({
            duration: 1000,
            once: false,
          });
          AOS.refresh();
        } else {
          AOS.init({
            duration: 0,
            once: true,
          });
          AOS.refresh();
        }
      });
    }

    animateOnScroll();

    window.addEventListener("resize", animateOnScroll);

    return () => {
      window.removeEventListener("resize", animateOnScroll);
    };
  }, []);

  return (
    <nav
      className="main-nav animate-on-scroll"
      onClick={closeNav}
      data-aos-duration="1000"
    >
      <div className="logo-name">
        <a href="/" aria-label="Home">
          <Logo />
        </a>
      </div>
      <ul>
        <li>
          <a href="#about" aria-label="About Section">
            About
          </a>
        </li>
        <li>
          <a href="#works" aria-label="Works Section">
            Works
          </a>
        </li>
        <li>
          <a href="#contact" aria-label="Contact Section">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
