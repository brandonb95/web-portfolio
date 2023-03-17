import { useState, useEffect } from 'react'

const About = () => {
    const restPath = 'http://localhost/brandonbirk/wp-json/wp/v2/posts/13'
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
            <article id={`post-${restData.id}`}>
                <div className="entry-content animate__animated animate__lightSpeedInRight" dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                </div>
            </article>
        :
        <h2>About Not Loaded</h2>       
        }
        </>
    )
}

export default About
