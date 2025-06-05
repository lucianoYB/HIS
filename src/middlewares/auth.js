const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Verificar token en cookies
  const token = req.cookies.token;
  
  if (!token) {
    return res.redirect('/auth/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie('token');
    res.redirect('/auth/login');
  }
};

module.exports = authMiddleware;


