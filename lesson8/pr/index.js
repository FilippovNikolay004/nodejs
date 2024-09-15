var express = require('express');
const path = require('path');
var fs = require('fs');

var app = express();

var pathFile = 'logger.txt';

app.use(function(request, response, next){
    var data = `Address : ${request.ip}; Time: ${new Date().toLocaleString()}; URL : ${request.url}\n`;

    fs.appendFile(pathFile, data, function(err){
        console.log('data wrote');
    });

    next();
});

app.get('/', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, "/index.html"));
});

app.get('/home', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, "/home.html"));
});

app.get('/news', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, "/news.html"));
});

app.get('/aboutUs', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, "/aboutUs.html"));
});

app.get('/signIn', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, "/signIn.html"));
});

app.get('/signUp', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, "/signUp.html"));
});

app.listen(8080, function(){
    console.log('Server start')
});