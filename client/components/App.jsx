import React from 'react';
import axios from 'axios';
import config from '../config.json';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gif: {}
    }
  }

  componentDidMount() {
    axios.get('https://api.giphy.com/v1/gifs/trending', {
      params: {
        api_key: config.giphyApiKey
      }
    })
      .then((res) => {
        console.log(res);
        const data = res.data.data[0];
        this.setState({
          gif : data
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    return (
      <div>
        <h1>GIF Generator</h1>
        <iframe src={this.state.gif.embed_url} width="480" height="480" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href={this.state.gif.url}>via GIPHY</a></p>
      </div>
    )
  }
}

export default App;