const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const db = require('./db/db');

app.use(require('./routes/userRoute'));
app.use(require("./routes/postRoutes"));

app.get("/", (req,res) => {
    res.send({title:'Welcome to Home Page!'});
})

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
})