const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;


async function createNewUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if (username === '' || email === '' || password === '') {
      const errors = {
        username : !username ? 'Required' : undefined,
        email : !email ? 'Required' : undefined,
        password : !password ? 'Required' : undefined,
      }
      res.status(400).send({errors})
    } else {

      const errors = {};

      if (await User.findOne({username})) {
        errors.username = 'Please use a different username'
      }
      if (await User.findOne({email})) {
        errors.email = 'Please use a different email'
      }

      if (errors.username || errors.email) {
        res.status(400).send({errors})
      } else {
        const hashedPass = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ username, email, password: hashedPass });
        res
          .status(201)
          .send({id: user._id, email, username});
      }

    }
  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (username === '' || password === '') {
      const errors = {
        username : !username ? 'Required' : undefined,
        password : !password ? 'Required' : undefined,
      }
      res.status(400).send({errors})
    } else {
      const user = await User.findOne({ username });
      const logInResult = await user ? await bcrypt.compare(password, user.password) : false;  
      const errors = {
        username: 'Invalid Credentials',
        password: 'Invalid Credentials'
      }

      if (logInResult) {
        res.status(201).send({ id: user._id, username: user.username, email: user.email });
      } else {
        res.status(400).send({errors})
      }
    }

  } catch (error) {
    res.status(401).send(error);
  }
}
module.exports = {createNewUser, login};
