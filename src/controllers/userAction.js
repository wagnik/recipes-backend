const User = require('../db/models/user');
const bcrypt = require('bcrypt');

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
    const { name, email , password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Something missing' })
    }

    try {
      const user = await User.findOne({ email: email })
      if (!user) {
        return res.status(400).json({ msg: 'User not found' })
      }

      const matchPassword = await bcrypt.compare(password, user.password)
      if(matchPassword) {
        const userSession = { 
          name: user.name,
          email: user.email
        };
        req.session.user = userSession;
        return res.status(200).json({ message: 'You have logged in successfully', userSession })
      }
    } catch ( err ) {
      return res.status(400).json({ message: err.message })
    }
  },
  registerUser: async function(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Password, name and email are required' })
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: 'Password should be at least 8 characters long' })
    }
    
    const user = await User.findOne({ email })
    if(user) {
      return res.status(409).json({message: "User already exist"})
    }

    try {
      const newUser = new User({ name, email, password });
      bcrypt.hash(password, 7, async (err, hash) => {
        if (err) {
          return res.status(400).json({ message: err.message})
        }

        newUser.password = hash;
        await newUser.save().then(() => {
          return res.status(200).json({ message: "User is succesfully saved"})
        });
      })
      await newUser.save();
    } catch ( err ) {
      return res.status(409).json({ message: err.message});
    }
  },
  logoutUser: async function (req, res) {
    req.session.destroy((err) => {
      if( err ) {
        throw new Error();
      }

      res.clearCookie('session-id');
      res.status(200).json({message: 'User has been logged out'});
    })
  },
  isAuth: async (req, res) => {
    if (req.session.user) {
      return res.status(200).json(req.session.user)
    } else {
      return res.status(401).json({ message: 'Unauthorize'})
    }
  },
}