const express = require("express");
require("./dbconn")
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// routes
app.get('*', checkUser);
app.get("/", (req,res)=>{
    res.render("home");
});

app.get("/track", requireAuth, (req,res) =>{
    res.render("track");
});

app.use(authRoutes);

app.listen(3000, ()=>{
    console.log('server is running...');
});

