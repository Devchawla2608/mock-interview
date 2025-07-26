const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Can be candidateEmail or interviewerEmail
  interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview' },
  type: { type: String, enum: ['15-min-reminder', '1-hour-reminder', 'interview-starting'], required: true },
  sentAt: { type: Date, default: Date.now },
  delivered: { type: Boolean, default: false },
  read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);