const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('token');

  try {
    const decoded = jwt.verify(token, 'jwtPrivateKey');
    req.user = decoded; 
    if (!req.user.isAdmin) return res.status(403).send('Access denied');
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}

