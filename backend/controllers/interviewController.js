const Interview = require('../models/Interview');
const mongoose = require('mongoose');
const {categoryDetails} = require('../data/interviews');

exports.bookInterview = async (req, res) => {
  try {
    const {
      candidateEmail,
      candidateName,
      companyId,
      category,
      price,
      interviewerId,
      companyName, // Added companyName
      selectedDate,
      selectedSlot,
      completed
    } = req.body;
    const userId = req.user._id;

const newInterview = await Interview.create({
  userId: userId,
  interviewerId: interviewerId,
  companyId,
  companyName,
  candidateName:candidateName,
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
  const role = req.params.role;
  try {
    let query = {};
    if (role === 'candidate') {
      query.candidateEmail = userId;
    } else if (role === 'interviewer') {
      query.interviewerEmail = userId;
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }
    const interviews = await Interview.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      message: 'Interviews',
      interviews: interviews
    });
  } catch (err) {
    res.status(500).json({'message' :'An error occurred while fetching user interviews.' });
  }
};

// bookInterview function 
exports.bookInterviewForInterviewer = async (category , candidateEmail, interviewerRole, candidateName ) => {
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
      candidateName: candidateName,
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


exports.acceptInterview = async (req, res) => {
  try {
    const { interviewId, interviewerEmail , interviewerName } = req.body;
    if (!interviewId || !interviewerEmail || !interviewerName) {
      return res.status(400).json({ error: 'interviewId, email and name are required' });
    }

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    interview.interviewerEmail = interviewerEmail;
    interview.interviewerName = interviewerName
    interview.status = "approved"
    await interview.save();

    res.status(200).json({
      message: 'Interview accepted and interviewer email updated',
      interview
    });
  } catch (err) {
    console.error('Error accepting interview:', err);
    res.status(500).json({ error: err.message });
  }
};

