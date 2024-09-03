//Переменные обьявленные внутри модуля, являются локальными для модуля
var x = 10;

function Sum(a, b) {
    return a + b;
}
function Diff(a, b) {
    return a - b;
}
function Multi(a, b) {
    return a * b;
}
function Div(a, b) {
    return a / b;
}
function calc(a, b) {
    console.log(`Sum = ${Sum(a, b)}`);
    console.log(`Diff = ${Diff(a, b)}`);
    console.log(`Multi = ${Multi(a, b)}`);
    console.log(`Div = ${Div(a, b)}`);
}

function test(t) {
    console.log(`Сумма = ${Sum(1, 2)}`);
    console.log(t);
}



exports.X = x;
exports.MyTest = test;
exports.Calc = calc;
exports.Test = test;

