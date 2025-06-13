require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const flash = require('connect-flash');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(flash());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'src', 'views'));

app.use(express.static(path.join(__dirname,'src', 'public')));


const authRoutes = require('./src/routes/authRoutes');
const pacienteRoutes = require('./src/routes/pacienteRoutes');
const admisionRoutes = require('./src/routes/admisionRoutes');


const authMiddleware = require('./src/middlewares/auth');


app.use('/auth', authRoutes);
app.use('/pacientes', authMiddleware, pacienteRoutes);
app.use('/admisiones', authMiddleware, admisionRoutes);


app.get('/', (req, res) => {
  res.render('index', { title: 'Sistema Hospitalario' });
});

// Middleware para pasar el usuario en las respuestas
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Middleware para pasar los mensajes flash a las vistas
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).render('error', { 
    error: 'Página no encontrada',
    title: 'Error 404 - Página no encontrada'
  });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const errorMessage = process.env.NODE_ENV === 'development' 
    ? err.message 
    : 'Ha ocurrido un error en el servidor';
  res.status(statusCode).render('error', {
    title: `Error ${statusCode}`,
    error: errorMessage
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});




