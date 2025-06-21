const {User} = require('../models/User');
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
    console.log('Found User:', user);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({message:'User Logged in succesfullly', token, user: user });
  } catch (err) {
    console.log("err " , err)
    res.status(500).json({ message: err.message });
  }
};




exports.updateProfile = async (req, res) => {
    console.log('Update User Request Body:', req.body);
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

    console.log('Found User for Update:', user);


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

    console.log('Updated User:', updatedUser);
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });

  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};
