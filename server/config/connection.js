
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
    process.env.MONGODB_URI)
.then(()=> {
    console.log("connected to mongoatlase")
}).catch((e)=>{
    console.log("Unable to connect atlas")
    console.log(e)
});

module.exports = mongoose.connection;


