const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  interviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true }, // Selected date
  startTime: { type: String, required: true }, // "10:00"
  endTime: { type: String, required: true },   // "11:00"
  slotId: { type: String }, // Optional: to track original slot if from a list
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
