    const express = require('express');
    const { requestOtp, verifyOtp } = require('../controller/authController');

    const router = express.Router();

    // Route to request OTP
    router.post('/request-otp', requestOtp);

    // Route to verify OTP
    router.post('/verify-otp', verifyOtp);

    module.exports = router;
        