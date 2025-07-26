const cron = require('node-cron');
const NotificationService = require('../services/notificationService');

// Run every minute but optimized for single interviews
function startScheduler() {
  cron.schedule('* * * * *', async () => {
    try {
      console.log('[Scheduler] Checking for upcoming interviews...');
      await NotificationService.checkUpcomingInterviews();
    } catch (error) {
      console.error('Scheduler error:', error);
    }
  });
}

module.exports = startScheduler;