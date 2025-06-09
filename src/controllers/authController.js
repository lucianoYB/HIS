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
      res.flash('success', 'Inicio de sesión exitoso');
      res.redirect('/'); // O la ruta que prefieras
    } catch (error) {
      res.render('auth/login', { 
        title: 'Iniciar Sesión',
        error: error.message,
    username: req.body.username

      });
    }
  },

  logout: (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
  }
};

module.exports = authController;