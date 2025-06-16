const Interview = require('../models/Interview');
const mongoose = require('mongoose');

exports.bookInterview = async (req, res) => {
  try {
    const {
      companyId,
      category,
      price,
      interviewerId,
      selectedDate,
      selectedSlot,
      completed
    } = req.body;

    const userId = req.user._id;

const newInterview = await Interview.create({
  userId: userId,
  interviewerId: interviewerId,
  companyId,
  category,
  price,
  selectedDate,
  startTime: selectedSlot.startTime,
  endTime: selectedSlot.endTime,
  slotId: selectedSlot.id,
  isSlotAvailable: selectedSlot.isAvailable,
  slotPrice: selectedSlot.price,
  completed: completed || false
});

    res.status(200).json({
      message: 'Interview booked successfully',
      interview: newInterview
    });
  } catch (err) {
    console.error('Error booking interview:', err);
    res.status(500).json({ error: err.message });
  }
};



exports.getUserInterviews = async (req, res) => {
  const userId = req.params.userId;
  try {
    const interviews = await Interview.find({ userId }).sort({ date: -1 });
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
