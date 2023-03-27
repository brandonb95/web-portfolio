import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import HeaderPostPage from './HeaderPostPage'
import ScrollButton from './ScrollButton';
import RelatedPosts from './RelatedPosts';

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
    

    // This code will retrieve the previous and next post
    const [relatedPosts, setRelatedPosts] = useState([])

        useEffect(() => {
            const fetchRelatedPosts = async () => {
            const response = await fetch('http://localhost/brandonbirk/wp-json/wp/v2/brandonbirk-works')
            if (response.ok) {
                const data = await response.json()
                setRelatedPosts(data)
            }
            }
            fetchRelatedPosts()
        }, [])
    
    return (
        <>
        { isLoaded ?
                <>
        <HeaderPostPage />

            <article className="project-page-container" id={`post-${restData.id}`}>

            <h3 className="project-page-title">{restData.acf.title}</h3>
            
            <section id="problems">
                <div className="block-1">
      
                <img className="project-page-cover"src={restData.acf.cover.url} alt={restData.acf.cover.alt}></img>

                <p className="project-page-desc1">{restData.acf.content_description_1}</p>

                <p className="project-link-1"><a href="https://github.com/brandonb95/web-portfolio" target="_blank">{restData.acf.link_1}</a></p>
                </div>
            </section>

            <section id="software-tools-used">
                <div className="block-2">
                <img className="project-page-image2"src={restData.acf.image_2.url} alt={restData.acf.image_2.alt}></img>

                <p className="project-page-desc2">{restData.acf.content_description_2}</p>

                <p className="project-page-desc3">{restData.acf.content_description_3}</p>

                </div>
            </section>

            <section id="inspiration">
                <div className="block-3">
                <img className="project-page-image3"src={restData.acf.image_3.url} alt={restData.acf.image_3.alt}></img>

                <p className="project-page-desc4">{restData.acf.content_description_4}</p>

                </div>
            </section>

            <section id="examples">
                <div className="block-4">

                <img className="project-page-image4"src={restData.acf.image_4.url} alt={restData.acf.image_4.alt}></img>
                <img className="project-page-image5"src={restData.acf.image_5.url} alt={restData.acf.image_5.alt}></img>

                <p className="project-page-desc5">{restData.acf.content_description_5}</p>

                </div>
            </section>

            <section id="final-result">
                <div className="block-5">

                <img className="project-page-image6"src={restData.acf.image_6.url} alt={restData.acf.image_6.alt}></img>

                <p className="project-page-desc6">{restData.acf.content_description_5}</p>

                </div>
            </section>

            {relatedPosts.length > 0 && <RelatedPosts relatedPosts={relatedPosts} />}

            </article>
            

            <ScrollButton />
            
            </>   


        :
        
        <h2>Post Content Not Loaded</h2>    
        }
        </>
    )
}

export default PostPage
