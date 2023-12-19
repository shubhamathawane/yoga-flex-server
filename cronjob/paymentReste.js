const User = require("../models/UserSchema");

const cron = require('node-cron');

cron.schedule('0 0 1 * *', async () => {
  try {
    const today = new Date();
    const isFirstDayOfMonth = today.getDate() === 1;

    if (isFirstDayOfMonth) {
      await User.updateMany({}, { $set: { payment_status: false } });
      console.log('Payment status reset for all users');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}, {
  scheduled: true,
  timezone: 'Asia/Kolkata'
});