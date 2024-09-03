var mod = require('./mod');

// переменной и функции в данном модуле не существует!
console.log(mod.X); // Error!
mod.MyTest();         // Error!
mod.Calc(5 ,5);
mod.Test('Hello');