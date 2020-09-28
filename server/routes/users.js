const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./../../db/model.js');
const auth = require('../auth.js');

router.post('/register', async (req, res) => {
  let data = req.body;

  // Validate user information
  if (!data.email || !data.username || !data.password || !data.confirmPassword) {
    res.status(400).json({message: 'Please fill all of the fields to register.'});
  }
  if (data.password.length < 6) {
    res.status(400).json({message: 'Password must be at least 6 characters long.'});
  }
  if (data.password !== data.confirmPassword) {
    res.status(400).json({message: 'Passwords do not match.'});
  }

  //if no role is passed in, default to basic user permission
  if (!data.role) {
    data.role = 'user';
  }

  // Hash password
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(data.password, salt);

  const newUser = {
    email: data.email,
    username: data.username,
    password: hash,
    role: data.role
  }

  // try to create a new user with the validate information
  User.create(newUser)
  .then((result) => {
    console.log(result);
    res.status(200).json({message: `User: \"${data.username}\" registered with email: \"${data.email}\"`});
  })
  .catch((err) => {
    console.log(err);
    // determine whether the email or username is already taken
    let duplicatedValue = Object.keys(err.keyValue);
    res.status(500).json({message: `A user already exists with that ${duplicatedValue[0]}`});
  })
})

router.post('/login', async (req, res) => {
  const data = req.body;

  if (!data.email|| !data.password) {
    res.status(400).json({message: 'Please enter your email and password to login.'});
  }

  User.findOne({email: data.email})
    .then((user) => {
      // compare hashed password
      bcrypt.compare(data.password, user.password)
        .then((isCorrect) => {
          if (!isCorrect) {
            res.status(400).json({message: 'Password is invalid.'});
          } else {
            const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
            res.status(200).json({
              token: token,
              user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
              }
            });
          }
        })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({message: 'An account with that email does not exist.'});
    })
})

router.delete('/delete', auth, async (req, res) => {
  console.log(req.user);
  User.findByIdAndDelete({_id: req.user})
    .then((deletedUser) => {
      res.status(200).send({message: 'Successfully deleted user.', user: deletedUser});
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({message: 'Deletion failed', error: err.message});
    })
})

module.exports = router;