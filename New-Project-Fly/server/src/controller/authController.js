const prisma = require('../db/prismaClient');
const { createAndSendOtp } = require('../utils/otpUtils');
const BadRequestError = require('../error/bad-request-error');
const jwt = require('jsonwebtoken');

exports.requestOtp = async (req, res) => {
  console.log("body", req.body)
  const { email } = req.body;
  console.log(email, "emailllllll")
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new BadRequestError('User not found');
  }

  await createAndSendOtp(user.id, email);

  res.status(200).json({ message: 'OTP sent to your email' });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  // Find user by email
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new BadRequestError('User not found');
  }

  // Check if the OTP is valid
  const validOtp = await prisma.otp.findFirst({
    where: {
      userId: user.id,
      otp,
      expiresAt: {
        gte: new Date(),
      },
    },
  });

  if (!validOtp) {
    throw new BadRequestError('Invalid or expired OTP');
  }

  // Generate JWT Token
  const token = jwt.sign(
    { userId: user.id, role: user.userType },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Redirect based on role
  let redirectUrl = '';
  switch (user.userType) {
    case 'EMPLOYEE':
      redirectUrl = '/employee-dashboard';
      break;
    case 'VENDOR':
      redirectUrl = '/vendor-dashboard';
      break;
    case 'ADMIN':
      redirectUrl = '/admin-dashboard';
      break;
  }

  res.status(200).json({ message: 'OTP verified', token, redirectUrl });
};
