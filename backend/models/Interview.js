const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  interviewerId: { type: String, required: true },
  companyName: { type: String, required: true }, // Added companyName field
  // No ref to Company since Company schema is not present
  companyId: { type: String, required: true },
  category: { type: String, required: true },
  candidateEmail: { type: String, required: true }, // Assuming this is the userId of the candidate
  interviewerEmail: { type: String,required: true , default:"dev.chawla2608@gmail.com"}, // Assuming this is the userId of the interviewer
  price: { type: Number, required: true },
  selectedDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },

  slotId: { type: String, required: true },           // selectedSlot.id
  isSlotAvailable: { type: Boolean, default: true },  // selectedSlot.isAvailable
  slotPrice: { type: Number },                        // selectedSlot.price
  candidateRating: { type: String },
  interviewerRating: { type: String },
  completed: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
