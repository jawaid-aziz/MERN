const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");

const app = express();
const port  = 8000;

mongoose
    .connect("mongodb://localhost:27017/practice-database")
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => {
        console.log(err);
    })
const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    gender:{
        type: String,
        required: true
    },
})

const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({extended: true}));

app.get("/users", (req, res) => {
    res.json(users);
})

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({id: users.length + 1, ...body});
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        res.json("User added");
    });
})

app.route("/users/:id")
.get((req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id);
    res.json(user);
})
.patch((req, res) => {
    const id = req.params.id;
    const index = users.findIndex(user => user.id == id);
    users[index] = {...users[index], ...req.body};
})
.delete((req, res) => {
    const id = req.params.id;
    const index = users.findIndex(user => user.id == id);
    users.splice(index, 1);
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users));
    res.json("User deleted");
})

app.listen(port, () => {
    console.log("Server is listening");
})

