var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var session = require("express-session");

var app = express();

app.use(session({secret: 'codingdojorocks'}));  // string for encryption
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if(req.session.counter){
        req.session.counter += 1;
    }
    else{
        req.session.counter = 0;
    } 
    res.render("index", {'counter':req.session.counter});
})

app.get('/two', function(req, res){
    req.session.counter += 2;
    res.redirect('/');
})

app.get('/catchUp', function(req, res){
    req.session.counter += 10;
    res.redirect('/');
})

app.get('/reset', function(req, res){
    req.session.counter = 0;
    res.redirect('/');
})

app.post('/users', function(req, res) {
 console.log("POST DATA", req.body);
 res.redirect('/');
})

app.get("/users", function (request, response){
    // hard-coded user data
    var users_array = [
        {name: "Michael", email: "michael@codingdojo.com"}, 
        {name: "Jay", email: "jay@codingdojo.com"}, 
        {name: "Brendan", email: "brendan@codingdojo.com"}, 
        {name: "Andrew", email: "andrew@codingdojo.com"}
    ];
    response.render('users', {users: users_array});
})

app.listen(8000, function() {
 console.log("listening to those hot MEAN cuts on port 8000");
});
