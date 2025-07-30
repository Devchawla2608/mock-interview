const express = require("express");
const router = express.Router();
<<<<<<< Updated upstream
const { register, login , updateProfile} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/update-profile' , updateProfile);
router.get('/health', (req, res) => {
  res.status(200).json({ message: 'Auth service is running' });
=======
const {
  register,
  login,
  sendOtp,
  verifyOtp,
  updateOtp,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/update-otp", updateOtp);
router.get("/health", (req, res) => {
  res.status(200).json({ message: "Auth service is running" });
>>>>>>> Stashed changes
});

module.exports = router;
