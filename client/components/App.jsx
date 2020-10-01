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
    axios.get('/gifs/trending')
      .then((res) => {
        console.log(res);
        const data = res.data;
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
        <div display="inline-block">
          <h3>GIF Generator</h3>
          <button>Sign Up</button>
          <button>Login</button>
        </div>
        <iframe src={this.state.gif.embed_url} width="480" height="480" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href={this.state.gif.url}>via GIPHY</a></p>
      </div>
    )
  }
}

export default App;