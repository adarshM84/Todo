const connectToMongo=require("./db.js");
const express=require('express');
let cors = require('cors');
connectToMongo();

let app=express();
const port=4000;

app.use(cors());//for use request from all orogin
app.use(express.json());//for use request body we have to use middle ware


// available routes


app.use('/api/auth/',require('./routes/auth.js'));
app.use('/api/notes/',require('./routes/notes.js'));


app.listen(port,()=>{
    console.log(`your website is running at http://localhost:${port}`)
})
//for nodemon npx nodemon nide.js
