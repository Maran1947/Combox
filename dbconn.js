const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/combox";

// it will return a promise
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log("Connection successfull..."))
.catch((err)=>console.log(err));