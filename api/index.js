const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs'); // used to encrypt passwords
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer'); // used to grab files from api requests
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs'); // file system

const salt = bcrypt.genSaltSync(10); // for encrypting passwords
const secret ='khagf087gad986gaga6968gasd'; // used for username cookie

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads')); // points to the correct uploads directory for the images

mongoose.connect('mongodb+srv://blog:LUiPdJIY5UAGkwSn@cluster0.ihtfozl.mongodb.net/?retryWrites=true&w=majority');

app.post('/register', async (req, res) => {
    const {username,password} = req.body;
    try {
    const userDoc = await User.create({
        username,
        password:bcrypt.hashSync(password,salt)
    });
    res.json(userDoc);
    } catch(e) {
        res.status(400).json(e);
    }
});
app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id:userDoc._id,
          username
        });
      });
    } else {
      res.status(400).json('invalid credentials');
    }
  });

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
        if (err) throw err;
        res.json(info);
    });
});

app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext; // new path for file with its extension
    fs.renameSync(path, newPath); // rename the saved file to include it's extension

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
        if (err) throw err;
        const {title,summary,content} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            file: newPath,
            author: info.id
        });
        res.json(postDoc);
    });
});
app.put('/post', uploadMiddleware.single('file'), async (req,res) => {
    const newPath = null;
    if (req.file) { // if there's a new file then rename it
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
        if (err) throw err;
        const {id,title,summary,content} = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('you are not the author');
        }

        await postDoc.update({
            title,
            summary,
            content,
            file: newPath ? newPath : postDoc.cover
        });
        res.json(postDoc);
    });
});
app.get('/post', async (req,res) => {
    res.json(await Post.find()
                        .populate('author', ['username']) // find all posts in the database
                        .sort({createdAt: -1}) // -1 means descending order
                        .limit(20) // only show 20 posts
    );
});

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
});

app.delete('/post/:id', async (req, res) => {
    const {id} = req.params;
    try {
      const postDoc = await Post.findByIdAndDelete(id);
      if (!postDoc) {
        return res.status(404).send({ message: 'Post not found' });
      }
      res.send({ message: 'Post deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Server error' });
    }
  });

app.listen(4000, () => {
    console.log('Listening on port 4000');
});