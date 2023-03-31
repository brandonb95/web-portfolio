import { HashLink } from 'react-router-hash-link';
import { useState, useEffect } from 'react'
import Logo from '../logo.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "animate.css/animate.min.css";

const Navbar = ({ handleShowHideNav }) => {

  const [isLoading, setIsLoading] = useState(true);

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
    <>
    {isLoading ?
                <>
    <nav className="main-nav" onClick={closeNav} data-aos="fade-down" data-aos-duration="1000">
    <div className='logo-name-postpage'><HashLink to="/"><img src={Logo} alt="Site Logo" aria-label="Home"/></HashLink></div>

      <ul className='navbar-postpage'>
        <li>
          <HashLink to="/#about" aria-label="About Section">About</HashLink>
        </li>
        <li>
          <HashLink to="/#works" aria-label="Works Section"> Works</HashLink>
        </li>
        <li>
          <HashLink to="/#contact" aria-label="Contact Section">Contact</HashLink>
        </li>
      </ul>
    </nav>

    </> 
    :
        
        <h2>Loading...</h2>    
        }
    </>

  )
}

export default Navbar;