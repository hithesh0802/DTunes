const User = require('../models/User');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

exports.register = async (req, res,next) => {
    const {email, password,username } = req.body;
    try {
      let user = await User.findOne({email: email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      console.log(newUser);
  
      // const salt = await bcrypt.genSalt(10);
      // user.password = await bcrypt.hash(password, salt);
  
      const token = jwt.sign({ id: newUser._id }, process.env.JWT, {
        expiresIn: "9999 years",
      });
      // Return a JWT token
      return res.status(201).json({token,newUser});
  
    } catch (err) {
      return next(err);
    }
  
    //   return res.status(200).json({ token, user });
    } ;
  

exports.login = async (req, res,next) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email: email });
      if (!user) {
        return next(createError(404, "User not found"));
      }
      console.log(user);

    //   const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    console.log(password, user.password);
  
      const token = jwt.sign({ id: user._id }, process.env.JWT, {
        expiresIn: "9999 years",
      });
  
      return res.status(200).json({ token, user });
    } catch (error) {
      return next(error);
    }
  };
