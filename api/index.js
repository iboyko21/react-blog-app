const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();

app.use(cors());
app.use(express.json()); // use json parser

mongoose.connect('mongodb+srv://blog:LUiPdJIY5UAGkwSn@cluster0.ihtfozl.mongodb.net/?retryWrites=true&w=majority');

app.get('/test', (req, res) => { // test route
    res.json('test ok'); 
});
app.post('/register', async (req, res) => {
    const {username,password} = req.body;
    try {
    const userDoc = await User.create({username,password});
    res.json(userDoc);
    } catch(e) {
        res.status(400).json(e);
    }
});

app.listen(4000);