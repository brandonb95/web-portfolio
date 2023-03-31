import { Link } from 'react-router-dom';
import Logo from './Logo';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "animate.css/animate.min.css";

const Navbar = ({ handleShowHideNav }) => {
  function closeNav(e) {
    if (window.innerWidth < 600) {
      handleShowHideNav();
    } else {
      e.target.blur();
    }
  }

  // initialize the animate-on-scroll 
  AOS.init({
    duration: 1000, // set the animation duration
    once: true, // only animate once per viewport on page load
  });

  return (
    <nav className="main-nav" onClick={closeNav} data-aos="fade-down" data-aos-duration="1000">
      <div className='logo-name'><a href="/" aria-label="Home"><Logo /></a></div>
      <ul>
        <li>
          <a href="#about" aria-label="About Section">About</a>
        </li>
        <li>
        <a href="#works" aria-label="Works Section">Works</a>
        </li>
        <li>
        <a href="#contact" aria-label="Contact Section">Contact</a>

        </li>
      </ul>
    </nav>
  );
};

export default Navbar;