const User = require('../db/models/user');

module.exports = {
  getAllUsers: async function(req, res) {
    let users;

    try {
      users = await User.find({});
    } catch ( err ) {
      return res.status(500).json({ message: err.message })
    }

    res.status(200).json(users);
  },
  loginUser: async function(req, res) {
    const { email , password } = req.body;
    let user;

    try {
      user = await User.findOne({ email })
    } catch ( err ) {
      return res.status(401).json({ message: err.message })
    }

    if(user) {
      if(password === user.password) {
        return res.status(200).json({ message: "login sucess", user})
      } else {
        return res.status(401).json({ message: "wrong credentials"})
      }
    }
  },
  registerUser: async function(req, res) {
    const { name, email, password } = req.body;
    let newUser;
    
    const user = await User.findOne({ email })
    if(user) {
      return res.status(409).json({message:"user already exist"})
    }

    try {
      newUser = new User(req.body);
      await newUser.save();
    } catch ( err ) {
      return res.status(409).json({ message: err.message});
    }

    res.status(201).json(newUser)
  }
}