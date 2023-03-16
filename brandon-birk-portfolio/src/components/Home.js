import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Header from './Header';
import About from './About';
import Works from './Works';
import Contact from './Contact';


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
    
      
    return (
        <>
        { isLoaded ? <>

        <header id="masthead" className="site-header">
         
         
        <Header />
        
        <article className="landing-banner">
                <h1 className="landing-title">{restData.title.rendered}</h1>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                 
                </div>
            </article>

            
                </header>

                <section id="about">
                <About />
                </section>
                <section id="works">
                <Works />
                </section>
                <section id="contact">
                <Contact />
                </section>

                </>

                :
            <h2>Nothing</h2>       
            }
        </>   
    )

    }
    
export default Home
