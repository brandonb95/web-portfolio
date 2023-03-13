import { useState, useEffect } from 'react'
import Post from './Post'

const Works = () => {
  const restPath = 'http://localhost/brandonbirk/wp-json/wp/v2/brandonbirk-works?_embed&acf_format=standard'
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false)
  const [imagePath, setImagePath] = useState(null)

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

  // Update the image path when needed
  useEffect(() => {
    if (restData.length > 0 && restData[0].acf.cover) {
      const newImagePath = restData[0].acf.cover.url;
      setImagePath(newImagePath)
    }
  }, [restData])

  return (
    <>
      { isLoaded && restData.length > 0 ? (
        <article className="work-container">
          {restData.map((post) => (
            <Post key={post.id} post={post} imagePath={imagePath} />
          ))}
        </article>
      ) : (
        <h2>Works Not Loaded</h2>
      )}
    </>
  )
}

export default Works
