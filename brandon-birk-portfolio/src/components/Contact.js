import { useState, useEffect } from 'react'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    const restPath = 'http://localhost/brandonbirk/wp-json/wp/v2/pages/61?_embed'
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
        { isLoaded ?
            <article className="contact-container" id={`post-${restData.id}`}>
                <h2 className="contact-title">{restData.acf.heading}</h2>
                <p className="contact-blurb">{restData.acf.blurb}</p>

                <div className='social-icons'>
                    <div className='solo-social'>
                    <a href="https://www.linkedin.com/in/brandon-birk-36b4a3114/?originalSubdomain=ca" rel="noreferrer" target="_blank"><FaLinkedin /></a>
                    </div>
                    <div className='solo-social'>
                    <a href="https://github.com/brandonb95" rel="noreferrer" target="_blank"><FaGithub /></a>
                    </div>
                    <div className='solo-social'>
                    <a href="mailto:brandonbirk1995@gmail.com" rel="noreferrer" target="_blank"><FaEnvelope /></a>
                    </div>
                </div>

                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                </div>

            </article>
        :
        <h2>About Not Loaded</h2>       
        }
        </>
    )
}

export default Contact
