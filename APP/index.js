const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');

dotenv.config();

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Sessionsrs
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 600000,
    },
    resave: false,
    saveUninitialized: false
}));

// Variables
const PORT = process.env.PORT || 80;

// Routes
app.use('/spotify', require('./routes/spotifyRoutes'));
app.use('/home', require('./routes/homeRoutes'), require('./routes/favoritesRoutes'));
app.use('/play', require('./routes/playTrackRoutes'));
app.use('/artist', require('./routes/artistRoutes'));
app.use('/redirect', require('./routes/redirectRoutes'));
app.use('/album', require('./routes/albumRoutes'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});

module.exports = app;