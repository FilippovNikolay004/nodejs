var event = require('events');
var emitter = new event.EventEmitter;

var sayHello = () => {
    console.log('Hello!');
}
var addSpace = () => {
    console.log(' ');
}
var sayWorld = () => {
    console.log('world!');
}

// Добавление обработчика на событие
emitter.on('click', sayHello);
emitter.on('click', addSpace);
emitter.on('click', sayWorld);

// Вызов обработчиков 
emitter.emit('click');