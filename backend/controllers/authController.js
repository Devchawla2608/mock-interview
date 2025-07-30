<<<<<<< Updated upstream
const {User} = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {interviews} = require('../data/interviews');
const {bookInterviewForInterviewer} = require('./interviewController');

exports.register = async (req, res) => {
  try {
    console.log("req " , req.body)
  const { name, email, password, confirmPassword, role } = req.body;

  // Validate required fields
  if (!name || !email || !password || !confirmPassword || !role) {
    return res.status(400).json({ message: 'All fields (name, email, password, confirmPassword, role) are required' });
  }
  console.log("3")
    // 🔐 Check if passwords match
=======
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// testing
async function sendOtpEmail(email, otp) {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  const info = await transporter.sendMail({
    from: "OTP System <no-reply@example.com>",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
    html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
  });
  console.log("OTP email sent (Ethereal):", nodemailer.getTestMessageUrl(info));
  return true;
}

exports.register = async (req, res) => {
  const { name, email, phone, password, confirmPassword, role } = req.body;
  console.log("Register request:", req.body);
  try {
>>>>>>> Stashed changes
    if (password !== confirmPassword) {
      console.error("Password and confirm password do not match");
      return res
        .status(400)
        .json({ message: "Password and confirm password do not match" });
    }
<<<<<<< Updated upstream
    console.log("1")

    // 🔍 Check if user already exists
    const existingUser = await User.findOne({ email });
=======
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
>>>>>>> Stashed changes
    if (existingUser) {
      console.error("User with this email or phone number already exists");
      return res.status(400).json({
        message: "User with this email or phone number already exists",
      });
    }
<<<<<<< Updated upstream
    console.log("existingUser" ,existingUser)

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👤 Create new user
=======
    const hashedPassword = await bcrypt.hash(password, 10);
>>>>>>> Stashed changes
    const newUser = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
      isEmailVerified: false,
    });

    res.status(200).json({
      message: "User registered successfully. Please check your email for OTP.",
    });
  } catch (err) {
<<<<<<< Updated upstream
    console.log("err" , err)
=======
    console.error("Register error:", err);
>>>>>>> Stashed changes
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
<<<<<<< Updated upstream
  try {
  const { email, password } = req?.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({message:'User Logged in succesfullly', token:token, user: user });
  } catch (err) {
    res.status(500).json({ message: "Ops, We are facing some issues, please try again" });
=======
  const { email, phone, password } = req.body;
  console.log("Login request:", req.body);
  try {
    const user = await User.findOne({ email });
    console.log("User found at login:", user);
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isEmailVerified) {
      console.error("Email not verified");
      return res.status(403).json({
        message: "Please verify your email via OTP before logging in.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      message: "User Logged in succesfullly",
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  console.log("Send OTP request:", req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found for OTP");
      return res.status(404).json({ message: "User not found" });
    }
    const otp = generateOtp();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 60 * 1000); // 1 minute
    await user.save();

    // For now, just return success since frontend will handle EmailJS
    // The frontend will call updateOtp to sync the OTP
    console.log("OTP generated and saved for user:", email);
    res.status(200).json({ message: "OTP resent to email." });
  } catch (err) {
    console.error("Send OTP error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log("Verify OTP request:", req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found for OTP verification");
      return res.status(404).json({ message: "User not found" });
    }
    if (user.otp !== otp) {
      console.error("Invalid OTP");
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.otpExpires < new Date()) {
      console.error("OTP expired");
      return res.status(400).json({ message: "OTP expired" });
    }
    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    console.log("User after OTP verification:", user);
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateOtp = async (req, res) => {
  const { email, otp, otpExpires } = req.body;
  console.log("Update OTP request:", req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found for OTP update");
      return res.status(404).json({ message: "User not found" });
    }

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    console.log("OTP updated for user:", email);
    res.status(200).json({ message: "OTP updated successfully" });
  } catch (err) {
    console.error("Update OTP error:", err);
    res.status(500).json({ message: err.message });
>>>>>>> Stashed changes
  }
};




exports.updateProfile = async (req, res) => {
  const {
    email,
    phoneNumber,
    name,
    profileCompletion,
    bio,
    location,
    experience,
    currentCompany,
    currentRole,
    skills,
    codeforces,
    codechef,
    linkedin,
    leetcode,
    github
  } = req.body;
  try {
    const user = await User.findOne({ email }); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (profileCompletion) user.profileCompletion = profileCompletion;
    if (user.role === 'candidate') {
        const currentCandidateInfo = user.candidateProfileInformation || {};
        const currentCodingProfiles = currentCandidateInfo.codingProfiles || {};

        user.candidateProfileInformation = {
          ...currentCandidateInfo,
          bio: bio ?? currentCandidateInfo.bio,
          location: location ?? currentCandidateInfo.location,
          currentCompany: currentCompany ?? currentCandidateInfo.currentCompany,
          currentRole: currentRole ?? currentCandidateInfo.currentRole,
          experience: experience ?? currentCandidateInfo.experience,
          skills: skills ?? currentCandidateInfo.skills,
          codingProfiles: {
            ...currentCodingProfiles,
            codeforces: codeforces ?? currentCodingProfiles.codeforces,
            codechef: codechef ?? currentCodingProfiles.codechef,
            linkedin: linkedin ?? currentCodingProfiles.linkedin,
            leetcode: leetcode ?? currentCodingProfiles.leetcode,
            github: github ?? currentCodingProfiles.github,
          }
        };
    }else if (user.role === 'interviewer') {
        const { interviewerRole, category, reviewCount, totalEarnings, isApproved, slots } = req.body;
        if (category) user.category = category;
        if (interviewerRole) user.interviewerRole = interviewerRole;
        if (reviewCount) user.reviewCount = reviewCount;
        if (totalEarnings) user.totalEarnings = totalEarnings;
        if (slots) user.slots = slots;

        const currentInterviewerInfo = user.interviewerProfileInformation || {};
        const currentCodingProfiles = currentInterviewerInfo.codingProfiles || {};

        user.interviewerProfileInformation = {
          ...currentInterviewerInfo,
          bio: bio ?? currentInterviewerInfo.bio,
          location: location ?? currentInterviewerInfo.location,
          currentCompany: currentCompany ?? currentInterviewerInfo.currentCompany,
          currentRole: currentRole ?? currentInterviewerInfo.currentRole,
          experience: experience ?? currentInterviewerInfo.experience,
          skills: skills ?? currentInterviewerInfo.skills,
          codingProfiles: {
            ...currentCodingProfiles,
            codeforces: codeforces ?? currentCodingProfiles.codeforces,
            codechef: codechef ?? currentCodingProfiles.codechef,
            linkedin: linkedin ?? currentCodingProfiles.linkedin,
            leetcode: leetcode ?? currentCodingProfiles.leetcode,
            github: github ?? currentCodingProfiles.github,
          }
        };
    }
    const updatedUser = await user.save();

    // If the user is a candidate, initialize their interview rounds
    const interviewProcessStatus = bookInterviewForInterviewer(updatedUser?.category, updatedUser?.email, updatedUser?.interviewerRole , updatedUser?.name)
    if(interviewProcessStatus) {
    res.status(200).json({ message: 'User updated successfully and interview process initialized but payment is remaining', user: updatedUser });
    }else{
      return res.status(400).json({ message: 'User is updated but Failed to initialize interview rounds' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });

  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

