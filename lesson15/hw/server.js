var express  = require('express');
var path = require('path');

var port = 8080;


// вложенные приложения используются для маршрутизации 
var app = express();    // главное приложение
var news = express();       // вложенное приложение 
var aboutUs = express();    // вложенное приложение 


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "/pages/index.html"));
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, "/pages/home.html"));
});

news.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "/pages/news.html"));
});

aboutUs.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "/pages/aboutUs.html"));
});
aboutUs.get('/Company', function(req, res) {
    res.sendFile(path.join(__dirname, "/pages/company.html"));
});
aboutUs.get('/Me', function(req, res) {
    res.sendFile(path.join(__dirname, "/pages/me.html"));
});

app.get('/singIn', function(req, res) {
    res.sendFile(path.join(__dirname, "/pages/singIn.html"));
});

app.get('/singUp', function(req, res) {
    res.sendFile(path.join(__dirname, "/pages/singUp.html"));
});

// связывание главного приложения со вложенным 
app.use('/news', news); 
app.use('/aboutUs', aboutUs); 


app.listen(port, function() {
    console.log('app listening on port ' + port);
});