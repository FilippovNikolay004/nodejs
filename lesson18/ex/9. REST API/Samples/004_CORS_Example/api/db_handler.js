// Подключаем модуль mssql для работы с mssql сервером
var mssql = require('mssql'); 

// параметры соединения с бд
var config = {
	user: 'admin',                      // пользователь базы данных
    password: 'admin',                  // пароль пользователя 
    server: 'LAPTOP-31VSBGAE',          // хост
    database: 'testdb',                	// имя бд
    port: 1433,                         // порт, на котором запущен sql server
    options: {
        encrypt: true,                  // Использование SSL/TLS
        trustServerCertificate: true    // Отключение проверки самоподписанного сертификата
    },
    pool: {
        max: 10, 						// максимальное допустимое количество соединений пула 
        min: 0,  						// минимальное допустимое количество соединений пула 
        idleTimeoutMillis: 30000 		// время ожидания перед завершением неиспользуемого соединения 
    }
}

var connection = new mssql.ConnectionPool(config); 
var pool = connection.connect(function(err) {
	if (err) console.log(err)
}); 

module.exports = pool; 