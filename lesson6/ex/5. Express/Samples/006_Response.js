var express = require('express'); 
var app = express(); 

var port = 8080; 

app.get('/', function(req, res) { 

    // res.locals = свойство, хранящее локальные переменные данного цикла request/response
	res.locals.prop1 = 'this is a response property!'; 
	res.locals.prop2 = 'this is a response property! PROP 2'; 

	console.log(res.locals.prop1); 
	console.log(res.locals.prop2); 

	// метод res.append позволяет установить заголовки ответа 
	res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
	res.append('Warning', '199 Miscellaneous warning'); 

	// метод res.set делает то же самое 
	res.set('Cache-Control', 'no-cache'); 

    res.send('<h1>Sample Response</h1>' + '<h3>' + res.locals.prop1 + '</h3>'); 

	
}); 

app.listen(port, function() {
	console.log('app running on port ' + port); 
}); 