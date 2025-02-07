const http = require('http');
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    return res.send("Hello for home page")
})

app.get("/about", (req, res) => {
    return res.send("Hello for about page")
})

app.listen(8000, () => {
    console.log("Server is listening");
})

