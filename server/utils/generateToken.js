const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  // Generate a token using the User ID and the Secret from .env
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token valid for 30 days
  });
};

module.exports = generateToken