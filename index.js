const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Settings
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Variables
const PORT = process.env.PORT || 3000;
const loginRoutes = require('./routes/loginRoutes');

app.use('/login', loginRoutes);

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});

module.exports = app;
