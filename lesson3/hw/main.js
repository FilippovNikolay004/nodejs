var utils = require('util');

// Участник
function Participant() {
    this._name = '';
    this._maxRunningLength = 0;
    this._maxJumpHeight = 0;
    this._obstaclesPassed = 0;
    this._lengthPassed = 0;
}
Participant.prototype.Run = function(expenses) {
    console.log(`${this._name} бежит`);

    this._maxRunningLength - expenses < 0 ? 
        this._lengthPassed += (expenses + (this._maxRunningLength -= expenses)) :
        this._lengthPassed += expenses

    return this._maxRunningLength -= expenses;
}
Participant.prototype.Jump = function(expenses) {
    console.log(`${this._name} сделал прыжок`);

    return this._maxJumpHeight - expenses;
}
function Human() {
    this._name = 'Human';
    this._maxRunningLength = 80;
    this._maxJumpHeight = 165;
    this._obstaclesPassed = 0;
    this._lengthPassed = 0;
}
function Cat() {
    this._name = 'Cat';
    this._maxRunningLength = 200;
    this._maxJumpHeight = 190;
    this._obstaclesPassed = 0;
    this._lengthPassed = 0;
}
function Robot() {
    this._name = 'Robot';
    this._maxRunningLength = 90;
    this._maxJumpHeight = 150;
    this._obstaclesPassed = 0;
    this._lengthPassed = 0;
}

utils.inherits(Human, Participant);
utils.inherits(Cat, Participant);
utils.inherits(Robot, Participant);


// Препятсвтие
function Obstacle() {
    this._nameObstacle = '';
}
// Беговая дорога
function Treadmill() {
    this._nameObstacle = 'Беговая дорожка';
    this._length = 30;
}
Treadmill.prototype.overcome = function (Participant) {
    // console.log(Participant._maxRunningLength);

    if (Participant.Run(this._length) < 0) {
        return false;
    } else {
        Participant._obstaclesPassed += 1;
        return true;
    }
}
// Стена
function Wall() {
    this._nameObstacle = 'Стена';
    this._height = 160;
}
Wall.prototype.overcome = function (Participant) {
    if (Participant.Jump(this._height) < 0) {
        return false;
    } else {
        Participant._obstaclesPassed += 1;
        return true;
    }
}

utils.inherits(Treadmill, Obstacle);
utils.inherits(Wall, Obstacle);

utils.inherits(Participant, Obstacle);


var participant = [new Human, new Robot, new Cat];
var obstacle = [new Treadmill, new Treadmill, new Wall, new Treadmill, new Wall, new Treadmill, new Treadmill];

console.log('\n================\n');
for (let i = 0; i < participant.length; i++) {
    for (let j = 0; j < obstacle.length; j++) {
        if (!obstacle[j].overcome(participant[i])) {
            console.log(`Участник ${participant[i]._name} не прошел препятствие '${obstacle[j]._nameObstacle}' на дистанции ${participant[i]._lengthPassed}. Пройдено препятствий ${participant[i]._obstaclesPassed}`);
            break;
        } else if (obstacle.length == participant[i]._obstaclesPassed) {
            console.log(`Участник ${participant[i]._name} прошёл все ${participant[i]._obstaclesPassed} препятствий на дисстанцию: ${participant[i]._lengthPassed}`);
        }
    }
    console.log('\n================\n');
}