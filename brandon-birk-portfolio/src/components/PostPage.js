import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import HeaderPostPage from './HeaderPostPage'

const PostPage = () => {
    const { slug } = useParams()
    const restPath = `http://localhost/brandonbirk/wp-json/wp/v2/brandonbirk-works?slug=${slug}&_embed&acf_format=standard`
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data[0])
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
                <>
        <HeaderPostPage />

            <article className="project-page-container" id={`post-${restData.id}`}>

            <h3 className="project-page-title">{restData.acf.title}</h3>

            <section>
                <div className="block-1">
      
                <img className="project-page-cover"src={restData.acf.cover.url} alt={restData.acf.cover.alt}></img>

                <p className="project-page-desc1">{restData.acf.content_description_1}</p>

                <p className="project-link-1"><a href="https://github.com/brandonb95/web-portfolio" target="_blank">{restData.acf.link_1}</a></p>
                </div>
            </section>

            <section>
                <div className="block-2">
                <img className="project-page-image2"src={restData.acf.image_2.url} alt={restData.acf.image_2.alt}></img>

                <p className="project-page-desc2">{restData.acf.content_description_2}</p>

                </div>
            </section>

            </article>
            </>   

        :
        
        <h2>Post Content Not Loaded</h2>    
        }
        </>
    )
}

export default PostPage
