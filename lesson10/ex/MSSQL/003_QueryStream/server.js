var express  = require('express'); 
var app = express(); 

var port = 8080; 
var mssql = require('mssql'); 
// параметры соединения с бд
var config = {
	user: 'admin',   				// пользователь базы данных
	password: 'admin', 	 			// пароль пользователя 
	server: 'LAPTOP-31VSBGAE', 			// хост
	database: 'testdb',    			// имя бд
	port: 1433,			 			// порт, на котором запущен sql server
    options: {
        encrypt: true,  // Использование SSL/TLS
        trustServerCertificate: true // Отключение проверки самоподписанного сертификата
    },
}
app.use(function(req, res) { 
	
	mssql.connect(config, function(err) {
		
		var html = ``; 
		
		// для постепенной обработки данных по мере их поступления в node-mssql используется метод query и обработчики событий 
		var request = new mssql.Request(); 
		
		request.stream = true; // включить режим потока данных
		request.query('select * from items'); 

		// событие обработки колонки таблицы бд 
		request.on('recordset', function(columns) {
			console.log(columns); 
		});

		// событие обработки ряда таблицы бд 
		request.on('row', function(row) { 		
			html += `<h2>${row.id}  ${row.description}</h2>`;
		});

		// обработчик ошибок 
		request.on('error', function(err) {
			console.log(err); 
		});

		// обработчик события завершения запроса 
		request.on('done', function(affected) { 
			res.send(html); 
			console.log('done');  			
		});
	});	
});

app.listen(port, function() { 
	console.log('app listening on port ' + port); 
}); 