const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// TODO not used. 
// async function findAllUsers(req, res) { // Why do we need this function?
//   try {
//     const users = await User.find();
//     res.status(201); // TODO wrong status. 
//     res.send(users);
//   } catch (error) {
//     console.log(error);
//     res.status(500);
//     res.send(error);
//   }
// }

// async function findUserDetail(req, res) {
//   const { userId } = req.params;
//   try {
//     const user = await User.findById(userId);
//     res.status(200).send(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500);
//     res.send(error);
//   }
// }

async function createNewUser(req, res) {
  try {
    //if username exists, email
    const { username, email, password } = req.body;

    if (username === '' || email === '' || password === '') {
      const error = {
        username : !username ? 'required' : undefined,
        email : !email ? 'required' : undefined,
        password : !password ? 'required' : undefined,
      }
      res.status(400).send({error})
    } else {

      const error = {};

      if (await User.findOne({username})) {
        error.username = 'Please use a different username'
      }
      if (await User.findOne({email})) {
        error.email = 'Please use a different email'
      }

      if (error.username || error.email) {
        res.status(400).send({error})
      } else {
        const hashedPass = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ username, email, password: hashedPass });
        const {id, email, username} = user;
        res
          .status(201)
          .send({id, email, username});
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
    const user = await User.findOne({ username });
    if (user) {
      const logInResult = await bcrypt.compare(password, user.password);
      res
        .status(201)
        .json({ id: user.id, username: user.username, email: user.email });
    } else {
      throw new Error('Invalid email and password');
    }
  } catch (error) {
    res.status(401).send(error);
  }
}
// module.exports = { findAllUsers, createNewUser, login, findUserDetail };
module.exports = {createNewUser, login};
