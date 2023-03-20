import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import 'animate.css';
import Header from './Header';
import About from './About';
import Works from './Works';
import Contact from './Contact';


const Home = () => {
    const restPath = 'http://localhost/brandonbirk/wp-json/wp/v2/pages/6?_embed'
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

            <div className="bubbles">
                <span style={{'--i': '19'}}></span>
                <span style={{'--i': '15'}}></span>
                <span style={{'--i': '22'}}></span>
                <span style={{'--i': '18'}}></span>
                <span style={{'--i': '12'}}></span>
                <span style={{'--i': '21'}}></span>
                <span style={{'--i': '17'}}></span>
                <span style={{'--i': '11'}}></span>
                <span style={{'--i': '13'}}></span>
                <span style={{'--i': '24'}}></span>
                <span style={{'--i': '16'}}></span>
                <span style={{'--i': '14'}}></span>
                <span style={{'--i': '19'}}></span>
                <span style={{'--i': '15'}}></span>
                <span style={{'--i': '22'}}></span>
                <span style={{'--i': '18'}}></span>
                <span style={{'--i': '12'}}></span>
                <span style={{'--i': '21'}}></span>
                <span style={{'--i': '17'}}></span>
                <span style={{'--i': '11'}}></span>
                <span style={{'--i': '13'}}></span>
                <span style={{'--i': '24'}}></span>
                <span style={{'--i': '16'}}></span>
                <span style={{'--i': '14'}}></span>
            </div>
            
                <h1 className="landing-title animate__animated animate__bounceIn">{restData.acf.heading}</h1>
                <h2 className="landing-subheading animate__animated animate__bounceIn">{restData.acf.subheading}</h2>

            </article>


            
            
                </header>

                <article id="about">
                <About />
                </article>
                <article id="works">
                <Works />
                </article>
                <article id="contact">
                <Contact />
                </article>

                </>

                :
            <h2>Nothing</h2>       
            }
        </>   
    )

    }
    
export default Home
