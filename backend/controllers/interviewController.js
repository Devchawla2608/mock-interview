const Interview = require('../models/Interview');
const mongoose = require('mongoose');
const {categoryDetails} = require('../data/interviews');

exports.bookInterview = async (req, res) => {
  try {
    const {
      candidateEmail,
      companyId,
      category,
      price,
      interviewerId,
      companyName, // Added companyName
      selectedDate,
      selectedSlot,
      completed
    } = req.body;
    console.log('Booking Request Body:', req.body);
    const userId = req.user._id;

const newInterview = await Interview.create({
  userId: userId,
  interviewerId: interviewerId,
  companyId,
  companyName,
  candidateEmail: candidateEmail,
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
  console.log('Fetching interviews for userId:', userId);
  try {
    const interviews = await Interview.find({ candidateEmail: userId }).sort({ date: -1 });
    res.status(200).json({
      message: 'Interviews',
      interviews: interviews
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// bookInterview function 
exports.bookInterviewForInterviewer = async (category , candidateEmail, interviewerRole ) => {
  try {
    if (!categoryDetails[category]) {   
      console.error('Invalid category:', category);
      return false;
    }
    let futureInterviews = categoryDetails[category].rounds[interviewerRole];
    let price = categoryDetails[category].price;
    let companyName;
    if (category == 'A') {
      companyName = 'Category A Company'; // Replace with actual company name logic
    }
    for (let i = 0; i < futureInterviews.length; i++) {
    let newInterview = await Interview.create({
      interviewRoundName: futureInterviews[i].round,
      category,
      companyName: companyName,
      candidateEmail,
      price: price,
    });
    }
    return true;
  } catch (err) {
    console.error('Error booking interview:', err);
    return false;
  }
}


// Get new interviews for current interviewer in the same category with status 'requested'
exports.getNewInterviewsForInterviewer = async (req, res) => {
  try {
    const {category} = req.body
    const interviews = await Interview.find({
      category: category,
      status: 'requested'
    }).sort({ createdAt: -1 });
    res.status(200).json({
      message: 'New interviews for interviewer',
      interviews: interviews
    });
  } catch (err) {
    console.error('Error fetching new interviews:', err);
    res.status(500).json({ error: err.message });
  }
};

