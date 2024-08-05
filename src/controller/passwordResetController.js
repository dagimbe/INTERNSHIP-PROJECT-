const passwordResetService = require('../services/passwordResetService');

const requestPasswordReset = async (req, res) => {
  try {
    await passwordResetService.requestPasswordReset(req.body.email);
    res.status(200).send({ message: 'Password reset link has been sent to your email.' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await passwordResetService.resetPassword(token, newPassword);
    res.status(200).send({ message: 'Password has been reset successfully.' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  requestPasswordReset,
  resetPassword
};
