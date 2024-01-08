const mongoose = require('mongoose');
const MONGODB_URI = "mongodb+srv://sabinkumarthapa:Eu44Qu7P4rU7IACy@cluster0.af4bny1.mongodb.net/Googlebooks?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(MONGODB_URI, connectionParams)
.then(()=> {
    console.log("connected to mongoatlase")
}).catch((e)=>{
    console.log("Unable to connect atlas")
    console.log(e)
})

module.exports = mongoose.connection;


