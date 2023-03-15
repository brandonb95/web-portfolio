import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar';
import About from './About';
import Works from './Works';


const Home = () => {
    const restPath = 'http://localhost/brandonbirk/wp-json/wp/v2/pages/6'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
    

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
      
    return (
        <>
        { isLoaded ? <>

        <header id="masthead" className="site-header">
         
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

         <Navbar handleShowHideNav={showHideNav}/>
        
        </div>
        
        <article className="landing-banner">
                <h1 className="landing-title">{restData.title.rendered}</h1>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                 
                </div>
            </article>

            
                </header>

                <About />
                <Works />

                </>

                :
            <h2>Nothing</h2>       
            }
        </>   
    )

    }
    
export default Home
