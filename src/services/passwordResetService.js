const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendResetEmail = async (email, token) => {
  const resetLink = `http://localhost:4000/api/passwords/reset?token=${token}`;

  const mailOptions = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: 'Password Reset Request',
    text: `You are receiving this email because you (or someone else) have requested to reset the password for your account.\n\nPlease make a PUT request to the following link to complete the process:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.\n`
  };

  await transporter.sendMail(mailOptions);
};

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('No account with that email address exists.');

  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await user.save();
  await sendResetEmail(email, token);
};

const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) throw new Error('Password reset token is invalid or has expired.');

  user.password = await bcrypt.hash(newPassword, 8);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
};

module.exports = {
  requestPasswordReset,
  resetPassword
};
