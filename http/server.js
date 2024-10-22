const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
    let urlparsed = url.parse(req.url, true);
    if (req.url == "/") {
        fs.readFile(__dirname + "/index.html", "utf-8", (err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                res.end(data);
            }
        })
    }
    else if (urlparsed.pathname == '/usercheck') {
        let user = urlparsed.query;
        console.log(user);
        fs.readFile(__dirname + "/user.json", "utf-8", (err, data) => {
            let Data = JSON.parse(data);
            let exsist = Data.find(ele => ele.username == user.username && ele.password == user.password);
            if (!exsist) {
                res.end("failed");
            }
            else {
                res.end("sucess");
            }
        })
    }
})

server.listen(3001, (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("server started");
    }
})