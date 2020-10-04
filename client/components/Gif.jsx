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
    try {
      let result = await Axios.patch('/gifs/save', {
        gif: {
          url: gif.url,
          embed_url: gif.embed_url
        }
      }, {
        headers: {
          'x-auth-token': userData.token
        }
      });

      // Update userData to include new saved gif
      let updatedUserData = userData;
      updatedUserData.user.gif = result.data.user.gif;
      setUserData(updatedUserData);
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    // Only fetch a new, random gif if the user does not have one saved
    if (!userData.user.gif.url) {
      getANewTrendingGif();
    } else {
      setGif(userData.user.gif);
    }
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

