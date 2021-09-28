const express = require("express");
const axios = require("axios");
const validator = require("validator");
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view engine
app.set("view engine", "ejs");

// routes
app.get("/", (req,res)=>{
    res.render("home");
});

app.get("/track", (req,res) => {
    res.render("track", { data: "" });
})

app.post("/track", async (req,res) => {

    let platform = validator.escape(req.body.platform);
    let username = validator.escape(req.body.username);
    let response;
    try {
         response = await axios.get(`https://competitive-coding-api.herokuapp.com/api/${platform}/${username}`);
    } catch (err) {
        if(err.response.status === 500) {
            response = {
                data: {
                    status: "Failed",
                    status_code: 500,
                    details: "Internal server error"
                }
            }
        }
    }

    res.render("track", { data: {
        username: username,
        platform: platform,
        response: response.data
    }});
})

app.listen(3000, ()=>{
    console.log('server is running...');
});

