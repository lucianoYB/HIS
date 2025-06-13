const { authenticate } = require('../config/auth');

const authController = {
  showLogin: (req, res) => {
    res.render('auth/login', { title: 'Iniciar Sesión' });
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const token = await authenticate(username, password);
      res.cookie('token', token, { httpOnly: true });
      req.flash('success', 'Inicio de sesión exitoso');
      res.redirect('/');
    } catch (error) {
      req.flash('error', error.message);
      res.redirect('/auth/login');
    }
  },

  logout: (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
  }
};

module.exports = authController;