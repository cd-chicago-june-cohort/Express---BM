var express = require("express");
var app = express();

app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.send("This website cost $12,000");
})

app.listen(8000, function() {
    console.log("You're listening on LocalHost8000, your home for the MEAN stack.");
})

