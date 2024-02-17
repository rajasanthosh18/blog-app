const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Post = require("./models/Post")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')

const salt = bcrypt.genSaltSync(10);
const secret = "sdfghbn1324rtgq4rs";

app.use('/uploads',express.static('uploads'))
app.use(cors({credentials: true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser())
//
//mongodb+srv://rajasanthoshm:US2yi78PQtHaERIh@cluster0.mweuvvr.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(
  "mongodb+srv://rajasanthoshm:US2yi78PQtHaERIh@cluster0.mweuvvr.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/registration", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userData = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userData);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userData = await User.findOne({ username });
  if (!userData) {
    return res.status(400).json("not have user");
  }
  const passCheck = bcrypt.compareSync(password, userData.password);
  if (passCheck) {
    jwt.sign({username,id:userData._id},secret,{},(err,token)=>{
        if(err) throw err;
        res.cookie('token',token).json({
          id: userData._id,
          username,
        })
    })
  } else res.status(400).json("notcool");
});

app.get('/profile',async(req,res)=>{
  const {token} = req.cookies;
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  jwt.verify(token,secret,{},(err,info)=>{
    if(err) throw err;
    res.json(info);
    
  })
})

app.post('/logout',(req,res)=>{
  res.cookie('token','').json('ok');
})

app.post("/post", upload.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;
  const {token} = req.cookies;
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  jwt.verify(token,secret,{},async(err,info)=>{
    if(err) throw err;
    const postInfo = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id
    });    
    res.json(postInfo)

  })
  

});

app.get('/post',async(req,res)=>{
  res.json(await Post.find().populate('author').sort({createdAt: -1}).limit(10))
})

app.get('/post/:id',async(req,res)=>{
  const {id} = req.params
  res.json(await Post.findById(id).populate('author'))
})

app.put('/post',upload.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
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
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });

});

app.delete('/post/:id',async(req,res)=>{
  const {id} = req.params
  await Post.findByIdAndDelete(id)
  res.json('ok')
})

app.listen(8000, () => console.log("server started listening"));
