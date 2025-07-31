const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./config/passport'); // load the passport strategy

const authRoutes = require('./routes/authRoutes');
const interviewRoutes = require('./routes/interviewRoutes');

const app = express();

// Session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    secure: false, // set true in production
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRoutes);

module.exports = app;
