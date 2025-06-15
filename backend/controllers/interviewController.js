const Interview = require('../models/Interview');

exports.createInterview = async (req, res) => {
  try {
    const {
      companyId,
      category,
      price,
      interviewerId,
      selectedDate,
      selectedSlot
    } = req.body;

    const userId = req.user._id;

    const newInterview = await Interview.create({
      userId,
      interviewerId,
      companyId,
      category,
      price,
      date: selectedDate,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      slotId: selectedSlot.id
    });

    res.status(201).json({ message: 'Interview booked successfully', interview: newInterview });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
