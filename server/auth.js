const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No authentication token.' });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ message: 'Token is not valid, authorization denied.' });
    }
    req.user = verified.id;
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Authorization failed.' });
  }
};

module.exports = auth;