const { body, validationResult } = require('express-validator');

// Middleware for validating OTP request
const validateOtpRequest = [
  // Validate the 'email' field
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),

  // Middleware to handle the validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If validation errors are present, return a 400 response with error details
      return res.status(400).json({ errors: errors.array() });
    }
    // If no validation errors, proceed to the next middleware/controller
    next();
  },
];

module.exports = validateOtpRequest;
