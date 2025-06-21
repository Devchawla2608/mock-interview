const express = require('express');
const router = express.Router();
const { register, login , updateProfile} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/update-profile' , updateProfile);
router.get('/health', (req, res) => {
  res.status(200).json({ message: 'Auth service is running' });
});

module.exports = router;
