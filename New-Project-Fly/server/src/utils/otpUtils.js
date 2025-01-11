const nodemailer = require('nodemailer');
const crypto = require('crypto');
const prisma = require('../db/prismaClient');

// Generate a 6-digit OTP
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Send OTP email
const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

// Create and send OTP
const createAndSendOtp = async (userId, email) => {
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes validity

  // Save OTP to database
  await prisma.otp.create({
    data: {
      userId,
      otp,
      expiresAt,
    },
  });

  // Send OTP email
  await sendOtpEmail(email, otp);
};

module.exports = { createAndSendOtp };
