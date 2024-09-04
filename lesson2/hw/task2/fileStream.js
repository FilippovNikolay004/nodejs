var event = require('events');

function FileStream() {
    this._file = '';
}

FileStream.prototype = new event.EventEmitter();

FileStream.prototype.Read = function(path) {
    console.log(`Файл: ${path} - прочитан`);
    this.emit('ReadData', path); 
}

FileStream.prototype.Write = function(path, text) {
    console.log(`В файл ${path} записана информация:\n${text}`);
    this.emit('WriteData', path, text); 
}

exports.Stream = FileStream;