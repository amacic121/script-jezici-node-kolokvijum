const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, 'jwtPrivateKey');
    req.user = decoded; 
    if (!req.user.isModerator) return res.status(403).send('Access denied.');
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}
