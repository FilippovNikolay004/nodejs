var express  = require('express'); 
var app = express(); 

var port = 8080; 

var mssql = require('mssql'); 


// параметры соединения с бд
var config = {
  server: 'LAPTOP-31VSBGAE',
  database: 'testdb',
  user: 'admin',
  password: 'admin',
  options: {
    encrypt: true,  // Использование SSL/TLS
    trustServerCertificate: true // Отключение проверки самоподписанного сертификата
  },
  port: 1433
}

mssql.connect(config, err => {
  if (err) {
    console.error('Error', err);
  } else {
    console.log('Connect');

    const request = new mssql.Request();

    request.query('SELECT * FROM items', (err, result) => {
      if (err) {
        console.error('Error', err);
      } else {
        console.log(result.recordset);
      }
    });
  }
});

app.listen(port, function() { 
  console.log('app listening on port ' + port); 
});
