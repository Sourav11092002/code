const express = require("express");
const fs = require("fs");
const { type } = require("os");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "index.html");
})
app.post("/data", (req, res) => {
    fs.readFile(__dirname + "/user.json", "utf-8", (err, data) => {
        let Data = JSON.parse(data);
        console.log(Data);
        let isExsist = Data.filter(ele => ele.username == req.body.username && ele.password == req.body.password);
        if (isExsist.length > 0) {
            res.send(JSON.stringify({ "type": "true" }));
        }
        else {
            res.send(JSON.stringify({ "type": "false" }));
        }
    })
})
app.listen(3005, (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("hii");
    }
})