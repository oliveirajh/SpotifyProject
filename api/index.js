const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Variables
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');
const meRoutes = require('./routes/meRoutes');
const playerRoutes = require('./routes/playerRoutes');
const searchRoutes = require('./routes/searchRoutes');


app.use('/auth', authRoutes);
app.use('/me', meRoutes);
app.use('/player', playerRoutes);
app.use('/search', searchRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});

module.exports = app;