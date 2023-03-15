import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

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

        {console.log(restData)}
            <article className="project-container" id={`post-${restData.id}`}>
                <h3 className="project-title">{restData.acf.title}</h3>
      <div
        // className="entry-content"
        // dangerouslySetInnerHTML={{ __html: postId.content.rendered }}
      ></div>
      <img src={restData.acf.cover.url} alt={restData.acf.cover.alt}></img>

            </article>
            </>   

        :
        
        <h2>Post Content Not Loaded</h2>    
        }
        </>
    )
}

export default PostPage
