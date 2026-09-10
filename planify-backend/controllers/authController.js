const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    
    // Ensure all fields exist before hitting the database
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Please provide fullName, email, and password.' });
    }

    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return res.status(400).json({ message: 'Email is already registered and verified.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (user) {
      user.fullName = fullName;
      user.password = hashedPassword; 
      user.otp = otp;
      user.otpExpires = otpExpires;
    } else {
      user = new User({ fullName, email, password: hashedPassword, otp, otpExpires, isVerified: false });
    }

    await user.save();

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h2 style="color: #420D4B;">Welcome to Planify!</h2>
        <p>Your verification code is:</p>
        <h1 style="color: #DC92B3; letter-spacing: 5px;">${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `;

    await sendEmail({
      email: user.email,
      subject: 'Planify - Email Verification Code',
      html: emailHtml
    });

    res.status(200).json({ message: 'OTP sent successfully', email: user.email });
  } catch (err) {
    console.error("Registration Backend Error:", err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found.' });
    if (user.isVerified) return res.status(400).json({ message: 'User is already verified.' });
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token, user: { _id: user._id, fullName: user.fullName, email: user.email } });
    });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });
    
    if (!user.isVerified) return res.status(403).json({ message: 'Please verify your email via OTP first.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).send('Server error');
  }
};