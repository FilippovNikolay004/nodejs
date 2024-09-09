var http = require('http'); 
var fs = require('fs'); 
var url = require('url');
var path = require('path');
var querystring = require('querystring');

var port = 8080;

http.createServer(function(req, res) {
    // Обработка ошибок запросв
    req.on('error', function (err) {
        console.log(err);
    });

    if (req.url == '/') {
        // Чтение index.html
        var file_path = path.join(__dirname, 'authorization.html');

        fs.readFile(file_path, function (err, data) {
            // Обработка ошибок
            if (err) {
                console.log(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('Not Found!');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' }); 
                // Записать в ответ содержимое читаемого файла 
                res.write(data.toString());
            }

            res.end();
        });
    } else if (req.url == "/login" && req.method == "POST") {
        let body = '';

        // Получение данных POST запроса по частям
        req.on('data', buff => {
            body += buff.toString();
        });
        
        // Когда все данные получены
        req.on('end', () => {
            let parsedData = querystring.parse(body);
            console.log('Received data:', parsedData);

            console.log(`login: ${parsedData.login}`);
            console.log(`password: ${parsedData.password}`);

            // Отправить ответ клиенту
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('Registration was successful');
            res.end();
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('Resource not found');
    }
}).listen(port, function () {
    console.log('server running on port ' + port);
});