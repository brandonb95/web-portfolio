import { useState, useEffect } from 'react'

const Works = () => {
    const restPath = 'http://localhost/brandonbirk/wp-json/wp/v2/brandonbirk-works?_fields=id,title,content,acf.title,acf.image_1,acf.content_description_1,acf.content_description_2,acf.image_2,acf.content_description_3'
    const [restData, setData] = useState({});
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
        { isLoaded && restData.length > 0 && restData[0].content ?
        
            <article id={`post-${restData[0].id}`}>
                <h1>{restData[0].title.rendered}</h1>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData[0].content.rendered}}>
                </div>

                <div className="works-container" dangerouslySetInnerHTML={{__html:restData[0].title.rendered}}>
                    </div>
            </article>

        :
        <h2>Works Not Loaded</h2>       
        }
        </>
    )
}

export default Works
