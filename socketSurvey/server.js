var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();

app.use(express.static(path.join(__dirname, "./static")));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");



app.get("/", function(req, res) {
    res.render("index");
})




var server = app.listen(8000, function() {
    console.log("listening to those hot MEAN cuts on port 8000");
});

var io = require("socket.io").listen(server);

io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);

    socket.on( "submit", function (data){
        randomNum = Math.floor(Math.random() * 1000);
        info = {

            "user": data,
            "num": randomNum

        }
        socket.emit( 'server_response', info);
        io.emit( "server_response", {response: "THIS SHIT IS GLOBAL"});
    })
})