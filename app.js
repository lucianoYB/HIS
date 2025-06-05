require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");

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

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});




