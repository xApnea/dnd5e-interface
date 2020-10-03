import React from 'react';
import axios from 'axios';

class Gif extends React.Component {
  constructor() {
    super();
    this.state = {
      gif: {}
    }
  }

  componentDidMount() {
    axios.get('/gifs/trending')
      .then((res) => {
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
        <iframe src={this.state.gif.embed_url} width="480" height="480" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href={this.state.gif.url}>via GIPHY</a></p>
      </div>
    )
  }
}

export default Gif;

