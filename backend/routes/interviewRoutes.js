const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');
const auth = require('../middleware/auth'); // path to your middleware


router.post('/bookInterview',auth, interviewController.bookInterview);
router.get('/interviews/:userId/:role', interviewController.getUserInterviews);
router.post('/getNewInterviewsForInterviewer' , interviewController.getNewInterviewsForInterviewer)
router.post('/acceptInterview' , interviewController.acceptInterview)
module.exports = router;
