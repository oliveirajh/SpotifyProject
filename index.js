import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';


const app = express();
app.set('view engine', 'ejs');
app.use(express.static( 'public'));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});