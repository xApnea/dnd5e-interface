const router = require('express').Router();
const axios = require('axios');

const User = require('./../../db/model.js');

router.get('/trending', (req, res) => {
  axios.get('https://api.giphy.com/v1/gifs/trending', {
    params: {
      api_key: process.env.GIPHY_API_KEY
    }
  })
    .then((result) => {
      const randomIndex = Math.floor(Math.random() * Math.floor(result.data.data.length));
      const data = result.data.data[randomIndex];
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({error: err.message});
    })
});

router.patch('/save', (req, res) => {
  const data = req.body;

  User.findByIdAndUpdate(data.id, { gif: data.gif }, { new: true, useFindAndModify: false })
  .then((user) => {
    console.log(user);
    res.status(200).json({
      message: 'Saved Gif',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        gif: user.gif
      }
    });
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send({
      message: 'Could not find user',
      error: err.message
    });
  })
})

module.exports = router;