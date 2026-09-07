const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'Auth Error: No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Auth Error: Invalid token format' });

  try {
    // Replace 'secret' if your authController.js uses a different hardcoded string
    const secret = process.env.JWT_SECRET || 'secret'; 
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error('JWT Verification Error:', e.message);
    res.status(401).json({ message: 'Invalid token signature' });
  }
};