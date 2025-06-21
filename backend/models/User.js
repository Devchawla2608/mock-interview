const mongoose = require('mongoose');

const options = { discriminatorKey: 'role', collection: 'users', timestamps: true };

const baseUserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  profileCompletion: { type: String , default: '0' },
}, options);

const User = mongoose.model('User', baseUserSchema);

const candidateSchema = new mongoose.Schema({
  candidateProfileInformation: {
    bio: { type: String },
    location: { type: String },
    currentCompany: { type: String },
    currentRole: { type: String },
    experience: { type: String },
    skills: [String],
    codingProfiles: {
      codeforces: { type: String },
      codechef: { type: String },
      linkedin: { type: String },
      leetcode: { type: String },
      github: { type: String }
    }
  }
});
const Candidate = User.discriminator('candidate', candidateSchema);

const interviewerSchema = new mongoose.Schema({
  interviewerProfileInformation: {
    bio: { type: String },
    experience: { type: String },
    skills: [String],
    expertise: [String],
    languages: [String],
    codingProfiles: {
      codeforces: { type: String },
      leetcode: { type: String },
      github: { type: String }
    }
  },
  category: { type: String },
  reviewCount: { type: String },
  totalEarnings: { type: String },
  isApproved: { type: Boolean, default: false },
  slots: [String],
  approvalProcess: {
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    approvedBy: { type: String },
    approvedAt: { type: Date }
  }
});
const Interviewer = User.discriminator('interviewer', interviewerSchema);

const adminSchema = new mongoose.Schema({
  accessLevel: {
    type: String,
    enum: ['super', 'moderator', 'support'],
    default: 'moderator'
  },
  department: { type: String },
  permissions: [String],
  notes: { type: String }
});
const Admin = User.discriminator('admin', adminSchema);

module.exports = {
  User,
  Candidate,
  Interviewer,
  Admin
};
