const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const userSession = require('./middlewares/session');

dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 300000,
    },
    resave: false,
    saveUninitialized: false
}));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(userSession);

// Variables
const PORT = process.env.PORT || 3000;
const loginRoutes = require('./routes/loginRoutes');
const homeRoutes = require('./routes/homeRoutes');
const profileRoutes = require('./routes/favoritesRoutes');
const searchRoutes = require('./routes/searchRoutes');

app.use('/login', loginRoutes);

app.use('/home', homeRoutes);

app.use('/favorites', profileRoutes);

app.use('/search', searchRoutes);

app.use('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});

module.exports = app;