var stream = require('./fileStream');

var file = new stream.Stream();

file.Read('file.txt');
file.Write('file.txt', 'hello world');