const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { name, email, phone, password, confirmPassword, role } = req.body;

  try {
    // 🔐 Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and confirm password do not match' });
    }

    // 🔍 Check if user already exists
      console.log('req.body:' , req.body);
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email or phone number already exists'
      });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword , req.body);
    // 👤 Create new user
    const newUser = await User.create({
      name,
      email,
      phone,
      role,
      password: hashedPassword
    });

    res.status(200).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};



exports.login = async (req, res) => {
  const { email, phone, password } = req.body;
  console.log('Login Request Body:', req.body);
  try {
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({message:'User Logged in succesfullly', token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
