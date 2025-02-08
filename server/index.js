const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const port  = 8000;

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

