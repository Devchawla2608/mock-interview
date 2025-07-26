const Interview = require('../models/Interview');
const { sendEmail } = require('./emailService'); // To be implemented later

const NotificationService = {
  async checkUpcomingInterviews() {
    const now = new Date();
    const fifteenMinutesLater = new Date(now.getTime() + 15 * 60000);

    // Find interviews starting in exactly 15 minutes
    const upcomingInterviews = await Interview.find({
      selectedDate: {
        $gte: now,
        $lte: fifteenMinutesLater
      },
      notificationStatus: 'pending',
      completed: false
    });

    // Process each interview
    for (const interview of upcomingInterviews) {
      await this.sendReminder(interview);
      interview.notificationStatus = '15min-sent';
      await interview.save();
    }
  },

  async sendReminder(interview) {
    const reminderText = `
      REMINDER: Your interview starts in 15 minutes
      Role: ${interview.interviewRoundName}
      Company: ${interview.companyName}
      Time: ${interview.startTime} - ${interview.endTime}
      Meeting Link: ${interview.meetingUrl || 'Will be provided soon'}
    `;

    // Send to both parties
    await Promise.all([
      sendEmail({
        to: interview.candidateEmail,
        subject: 'Interview starts in 15 minutes',
        text: reminderText
      }),
      sendEmail({
        to: interview.interviewerEmail,
        subject: `Interview with ${interview.candidateEmail} starting soon`,
        text: reminderText
      })
    ]);
  }
};

module.exports = NotificationService;