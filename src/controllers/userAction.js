var User = require('../db/models/user');
var bcrypt = require('bcrypt');

module.exports = {
  getAllUsers: async function(req, res) {
    try {
      var users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  },
  loginUser: async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!email || !password) {
      return res.status(400).json({ message: 'Password and email are required' })
    }
    if (email && !(emailRegexp.test(email))) {
      return res
        .status(400)
        .json({ message: 'Login and/or password are incorrect' })
    }

    try {
      var user = await User.findOne({ email: email })
      if (!user) {
        return res.status(400).json({ message: 'Login and/or password are incorrect' })
      }

      var matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return res.status(400).json({ message: 'Login and/or password are incorrect' })
      }
      if (matchPassword) {
        var userSession = {
          id: user._id,
          name: user.name,
          email: user.email
        };
        req.session.user = userSession;
        return res.status(200).json({ message: 'You have logged in successfully', userSession })
      }
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },
  registerUser: async function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Password, name and email are required' })
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Password should be at least 8 characters long' })
    }
    if (email && !(emailRegexp.test(email))) {
      return res
        .status(400)
        .json({ message: 'Email is invalid' })
    }

    var user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "The entered e-mail already exists in the database" })
    }

    try {
      var newUser = new User({ name, email, password });
      bcrypt.hash(password, 7, async function(err, hash) {
        if (err) {
          return res.status(400).json({ message: err.message })
        }

        newUser.password = hash;
        await newUser.save().then(function() {
          return res.status(200).json({ message: "User is succesfully saved" })
        });
      })

      await newUser.save();
    } catch (err) {
      return res.status(409).json({ message: err.message });
    }
  },
  logoutUser: async function(req, res) {
    req.session.destroy(function(err) {
      if (err) {
        throw new Error();
      }
      res.clearCookie('session-id');
      res.status(200).json({ message: 'User has been logged out' });
    })
  },
  isAuth: async function(req, res) {
    if (req.session.user) {
      return res.status(200).json(req.session.user)
    } else {
      return res.status(401).json({ message: 'Unauthorize' })
    }
  },
}