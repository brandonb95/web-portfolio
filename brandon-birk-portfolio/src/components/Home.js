import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar';

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
        { isLoaded ?
        <header id="masthead" className="site-header">
          <div className="site-branding">
            {/* <p className="site-title">WordPress REST API</p> */}
          </div>
         
         <Navbar />
        
        <article>
                <h1>{restData.title.rendered}</h1>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                 
                </div>
            </article>
                </header>
                :
            <h2>Nothing</h2>       
            }
        </>   
    )

    }
    
export default Home
