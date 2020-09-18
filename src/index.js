const express = require("express");
const app = express()
const http = require('http').createServer(app);
const io = require("socket.io")(http)

var port = process.env.port || 8030;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html")
});

io.on("connection", (socket) => {

    socket.on("user-join", data => {
        socket.username = data
        socket.broadcast.emit("user-join", data);
    });

    socket.on("chat-message", message => {
        io.emit("chat-message", message)
    })

    socket.on("disconnect", data => {
        socket.broadcast.emit("user-left", socket.username)
    })
});

http.listen(port, () => {
    console.log('Server started at 8030');
})