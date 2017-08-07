var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var session = require("express-session")

var app = express();

app.use(session({secret: 'baldmike'})); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));

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
    
    socket.on("clicked", function (data){
        var click = parseInt(data.counter);
        click += 1;
        io.emit( 'server_response', {'click':click});        
    })

    socket.on("reset", function(data){
        io.emit( 'server_response', {'click':data.reset});    
    });

})