import { useState, useEffect } from 'react'

const About = () => {
    const restPath = 'https://localhost:3000/brandonbirk/wp-json/wp/v2/posts/13'
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
            <article id={`post-${restData.id}`}>
                <h1>{restData.title.rendered}</h1>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                </div>
            </article>
   
        </>
    )
}

export default About
