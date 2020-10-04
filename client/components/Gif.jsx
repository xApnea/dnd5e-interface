import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

function Gif() {
  const [gif, setGif] = useState({});

  const getANewTrendingGif = () => {
    axios.get('/gifs/trending')
    .then((res) => {
      const data = res.data;
      setGif(data);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  useEffect(() => {
    getANewTrendingGif();
  }, []);


  return (
    <div>
      <button onClick={getANewTrendingGif}>Get New</button>
      <div>
        <iframe src={gif.embed_url} width="480" height="480" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
        <p><a href={gif.url}>via GIPHY</a></p>
      </div>
    </div>
  )
}

export default Gif;

