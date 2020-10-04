import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import UserContext from './context/Context.jsx';

function Gif() {
  const [gif, setGif] = useState({});
  const { userData, setUserData } = useContext(UserContext);

  const getANewTrendingGif = async () => {
    try {
      let result = await Axios.get('/gifs/trending');
      const data = result.data;
      setGif(data);
    } catch(err) {
      console.error(err);
    }
  }

  const saveGif = async () => {
    console.log(userData);
    try {
      let result = await Axios.patch('/gifs/save', {
        id: userData.user.id,
        gif: {
          url: gif.url,
          embed_url: gif.embed_url
        }
      });
      console.log(result);
      // Set userData to saved gif
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getANewTrendingGif();
  }, []);


  return (
    <div>
      <button onClick={getANewTrendingGif}>Get New</button>
      <button onClick={saveGif}>Save Gif</button>
      <div>
        <iframe src={gif.embed_url} width="480" height="480" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
        <p><a href={gif.url}>via GIPHY</a></p>
      </div>
    </div>
  )
}

export default Gif;

