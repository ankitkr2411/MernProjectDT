const dotenv = require("dotenv");
const express = require('express');
const cors = require("cors");
const app = express();

app.use(cors({ origin:true, credentials:true }));

const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000",
}))

//This is used to give access to app to use config file 
//Once we have imported it here(app.js) we cann access it anywhere in server folder
dotenv.config({path:'./config.env'});


//This means copying everything here in conn file
require('./DB/conn');

//whenever any file comes in json convert it to object
app.use(express.json());

//we link the router file
app.use(require('./router/auth'));

const PORT = process.env.PORT;



app.listen(PORT, () =>{
     console.log(`server loading`);
})