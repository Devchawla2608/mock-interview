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
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and confirm password do not match' });
    }
    console.log("1")

    // 🔍 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email or phone number already exists'
      });
    }
    console.log("existingUser" ,existingUser)

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👤 Create new user
    const newUser = await User.create({
      name,
      email,
      role,
      password: hashedPassword
    });

    res.status(200).json({ message: 'User registered successfully' });

  } catch (err) {
    console.log("err" , err)
    res.status(500).json({ message: err.message });
  }
};



exports.login = async (req, res) => {
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

