const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();
const PORT = process.env.PORT || 4000;
const path = require('path')

//configure db
mongoose.set("useCreateIndex", true); //done to avoid deprecation warnings
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log("Database connected successfully")
        })
        .catch(err => {
            console.log({database_error: err})
        });

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan("dev"));


//ROUTES

// app.get("/",(req, res) => {
//     console.log("We're getting there")
// });

const userRoutes = require("./api/user/route/user"); //import user routes
app.use("/user", userRoutes);

app.use(express.static(path.join(__dirname, "./dist")));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'))
})

app.listen(PORT, () => {
    console.log(`App up and listening on port ${PORT}`)
})