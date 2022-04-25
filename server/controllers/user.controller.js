const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function index(req, res) {
  try {
    const users = await User.find();
    res.status(201);
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
}

async function create(req, res) {
  try {
    //if username exists, email
    const { username, email, password } = req.body;

    if (username === '' || email === '' || password === '')
      throw new Error('Please fill in the information');
    const hashedPass = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ username, email, password: hashedPass });

    res
      .status(201)
      .send({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
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
module.exports = { index, create, login };
