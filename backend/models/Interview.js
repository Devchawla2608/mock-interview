const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  interviewRoundName: { type: String},
  companyName: { type: String},
  category: { type: String, required: true },
  candidateEmail: { type: String, required: true }, // Assuming this is the userId of the candidate
  interviewerEmail: { type: String,required: true , default:"dev.chawla2608@gmail.com"}, // Assuming this is the userId of the interviewer
  price: { type: Number, required: true },
  selectedDate: { type: Date, required: true , default: Date.now }, // Default to current date
  startTime: { type: String, required: true, default: '09:00' }, // Default start time
  endTime: { type: String, required: true , default: '10:00' }, // Default end time

  slotId: { type: String},           // selectedSlot.id
  isSlotAvailable: { type: Boolean},  // selectedSlot.isAvailable
  slotPrice: { type: Number },                        // selectedSlot.price
  candidateRating: { type: String },
  interviewerRating: { type: String,},
  status: {type: String, default: 'requested'},
  completed: { type: Boolean, default: false },
  // pending, confirmed, completed, cancelled

}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
