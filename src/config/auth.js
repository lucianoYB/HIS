const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario'); 

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role
    },
    process.env.JWT_SECRET || 'secret-key',
    { expiresIn: '8h' }
  );
};

const authenticate = async (username, password) => {
  const user = await Usuario.findOne({ where: { username } });
  
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const isValid = await user.validPassword(password);
  
  if (!isValid) {
    throw new Error('Contraseña incorrecta');
  }

  return generateToken(user);
};

module.exports = {
  generateToken,
  authenticate
};