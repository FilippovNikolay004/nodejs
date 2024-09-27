var express  = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mssql = require('mssql');
var path = require('path');
var app = express();
var port = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index', { 
        title: 'Default',
        dataTHead: null, dataTBody: null,
        inputAdd: null, inputEdit: null, inputDelete: null
    });
});

// Маршрут для главной страницы
app.post('/', function(req, res) {
    
});



// add
app.post('/add', function(req, res) {
    

    res.send('Add item');
});


// edit
app.post('/edit', function(req, res) {
    

    res.send('Edit item');
});


// delete
app.post('/delete', function(req, res) {
    

    res.send('Delete item');
});


app.listen(port, function() {
    console.log('app listening on port ' + port);
});