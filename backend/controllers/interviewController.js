const Interview = require('../models/Interview');
const mongoose = require('mongoose');
const {categoryDetails} = require('../data/interviews');
const { ulid } = require('ulid');
const { google } = require("googleapis");


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
  interviewId: ulid(),
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


exports.completeInterview = async (req , res) => {
    try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      { notificationStatus: req.body.status || 'completed' },
    );
    res.json(interview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


// controllers/interviewController.js
// controllers/interviewController.js

exports.createMeeting = async (req, res) => {
  const { interviewId } = req.body;

  // 1. Get interview to fetch start/end time
  const interview = await Interview.findById(interviewId);
  if (!interview || !interview.startTime || !interview.endTime) {
    return res.status(400).json({ message: "Interview not found or missing time." });
  }

  const { startTime, endTime } = interview;
  const authClient = req.authClient;
  const calendar = google.calendar({ version: "v3", auth: authClient });

  const response = await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary: "TechMock Interview",
      start: { dateTime: startTime },
      end: { dateTime: endTime },
      conferenceData: {
        createRequest: {
          requestId: uuidv4(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });

  const meetingLink = response?.data?.hangoutLink;
  const eventId = response?.data?.id;

  // 2. Save link to DB
  interview.meetingLink = meetingLink;
  interview.eventId = eventId;
  await interview.save();

  res.status(200).json({
    message: "Meeting created",
    data: { meetingLink, eventId }
  });
};


exports.getInterview = async (req, res) => {
  const { interviewId } = req.params;

  try {
    if (!interviewId) {
      return res.status(400).json({
        status: 400,
        message: 'Interview ID is required.',
        data: null,
      });
    }

    const interview = await Interview.findOne({ interviewId });

    if (!interview) {
      return res.status(404).json({
        status: 404,
        message: 'Interview not found.',
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Interview fetched successfully.',
      data: interview,
    });
  } catch (error) {
    console.error(`[getInterview] Error for ID ${interviewId}:`, error);
    return res.status(500).json({
      status: 500,
      message: 'Internal server error. Please try again later.',
      data: null,
    });
  }
};