import { useState, useEffect } from 'react'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "animate.css/animate.min.css";

const Contact = () => {
    const restPath = 'https://brandonbirk.ca/portfolio-backend/wp-json/wp/v2/pages/61?_embed'
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
    
        // initialize the animate-on-scroll 
    AOS.init({
        duration: 1000, // set the animation duration
        once: true, // only animate once per viewport on page load
    });
    
    return (
        <>
        { isLoaded ?
            <article className="contact-container" id={`post-${restData.id}`} >
                <div data-aos="fade-up" data-aos-duration="1000">
                <h2 className="contact-title">{restData.acf.heading}</h2>
                <p className="contact-blurb">{restData.acf.blurb}</p>

                <div className='social-icons'>
                    <div className='solo-social'>
                    <a href="https://www.linkedin.com/in/brandon-birk-36b4a3114/?originalSubdomain=ca" rel="noreferrer" target="_blank"
                    aria-label="LinkedIn Button"><FaLinkedin /></a>
                    </div>
                    <div className='solo-social'>
                    <a href="https://github.com/brandonb95" rel="noreferrer" target="_blank" aria-label="GitHub Button"><FaGithub /></a>
                    </div>
                    <div className='solo-social'>
                    <a href="mailto:brandonbirk1995@gmail.com" rel="noreferrer" target="_blank" aria-label="Email Button"><FaEnvelope /></a>
                    </div>
                </div>

                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                </div>
                </div>
            </article>
        :
        <h2>Contact loading...</h2>       
        }
        </>
    )
}

export default Contact
