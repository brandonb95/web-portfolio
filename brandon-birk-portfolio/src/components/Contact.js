import { useState, useEffect } from 'react'

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
