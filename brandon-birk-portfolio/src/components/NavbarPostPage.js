import { HashLink } from 'react-router-hash-link';
import { useState, useEffect } from 'react'

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