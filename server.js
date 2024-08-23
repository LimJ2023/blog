const express = require("express");
const app = express();

app.listen(8080, function () {
    console.log("listening on 8080");
});

app.get("/pet", function (req, rsp) {
    rsp.send("펫쇼핑 할 수 있는 페이지");
});
app.get("/", function (req, rsp) {
    rsp.sendFile(__dirname + "/index.html");
});
