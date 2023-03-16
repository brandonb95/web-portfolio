import { useState, useEffect } from 'react'
import NavbarPostPage from './NavbarPostPage';

const Header = () => {

    // Mobile Nav Settings
    const [navOpen, setNavOpen] = useState(false);

    const showHideNav = () => {
        setNavOpen(!navOpen);
      };
    
      const isDesktop = e => {
        if (e.matches) {
          setNavOpen(false);
        }
      };

      useEffect(() => {
        let mediaQuery = window.matchMedia('(min-width: 768px)');
        mediaQuery.addEventListener('change', isDesktop);
        return () => mediaQuery.removeEventListener('change', isDesktop);
      }, []);

return(

<div className={navOpen ? 'show' : undefined}>
          <div className="logo-wrapper">
          </div>
        <button
            className="btn-main-nav"
            onMouseDown={e => {
            e.preventDefault();
            }}
            onClick={showHideNav}
        >
            <span className="hamburger-icon">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
            </span>
            <span className="sr-only">Menu</span>
        </button>

         <NavbarPostPage handleShowHideNav={showHideNav}/>
        
        </div>

)
}

export default Header