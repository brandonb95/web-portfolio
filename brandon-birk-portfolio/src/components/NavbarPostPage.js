import { HashLink } from 'react-router-hash-link';
import { useState, useEffect } from 'react'
import Logo from '../logo.svg';

const Navbar = ({ handleShowHideNav }) => {

  const [isLoading, setIsLoading] = useState(true);

  function closeNav(e) {
    if (window.innerWidth < 600) {
      handleShowHideNav();
    } else {
      e.target.blur();
    }
  }

  return (
    <>
    {isLoading ?
                <>
    <nav className="main-nav" onClick={closeNav}>
    <div className='logo-name'><HashLink to="/brandonbirk/home"><img src={Logo} alt="Site Logo" /></HashLink></div>

      <ul className='navbar-postpage'>
        <li>
          <HashLink to="/brandonbirk/home#about">About</HashLink>
        </li>
        <li>
          <HashLink to="/brandonbirk/home#works">Works</HashLink>
        </li>
        <li>
          <HashLink to="/brandonbirk/home#contact">Contact</HashLink>
        </li>
      </ul>
    </nav>

    </> 
    :
        
        <h2>Post Content Not Loaded</h2>    
        }
    </>

  )
}

export default Navbar;