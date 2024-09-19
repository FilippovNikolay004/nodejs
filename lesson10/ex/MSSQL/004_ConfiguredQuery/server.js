var express  = require('express'); 
var app = express(); 
var port = 8080; 
var mssql = require('mssql');
var router = express.Router();
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



router.route('/:id')
    .get(function(req, res) {
		var connection = new mssql.ConnectionPool(config); 
		
		console.log(`ID: ${req.params.id}`);

		let number = parseInt(req.params.id, 10);
		console.log(typeof(number));

		connection.connect(function(err){		
			// конструктор для предварительного форматирования запросов к бд - PreparedStatement
			var ps = new mssql.PreparedStatement(connection);		
			// метод input позволяет указать значение параметра, который будет использован в запросе  
			// аргументы: 
			
			// name - имя параметра 
			// type - SQL тип данных 
			
			ps.input('paramT', mssql.Int);
			
			/* */
			if (isNaN(number)) {
				res.status(400).send('Invalid ID parameter');
				console.log('Ошибка: параметр ID не является числом');
				return;
			}

			// подготовка запроса 
			ps.prepare('SELECT * FROM items WHERE id=@paramT ', function(err) {
				
			if (err) console.log(err); 

			// выполнение запроса 
			ps.execute({paramT: number}, function(err, data) {
				if (err) console.log(err); 
				
				res.send(data.recordset); 
				console.log('prepared statement executed'); 					
			});
			});		
		});
    });
app.use("/", router);

app.listen(port, function() { 
	console.log('app listening on port ' + port); 
}); 