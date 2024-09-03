// task 1
console.log('======TASK 1======');
function Point(x, y) {
    this.x = x;
    this.y = y;

    this.print = () => { console.log(`x = ${this.x} y = ${this.y}`); }
}
function checkParallel(point1, point2) {
    if (point1.x == point2.x) { console.log("Прямая, проходящая через эти точки, параллельна оси Y (ординат)."); } 
    else if (point1.y == point2.y) { console.log("Прямая, проходящая через эти точки, параллельна оси X (абсцисс)."); } 
    else { console.log("Прямая не параллельна ни одной из осей."); }
}

var point1 = new Point(1, 2);
var point2 = new Point(1, 5);
point1.print();
point2.print();

checkParallel(point1, point2);
console.log('============\n');


// task 2
console.log('======TASK 2======');
function Human() {
    this.fName;
    this.lName;
    this.age;

    this.write = (fName, lName, age) => {
        this.fName = fName;
        this.lName = lName;
        this.age = age;
    }
    this.print = () => {
        console.log(`${this.fName == undefined || this.lName == undefined || this.age == undefined ? 
            'Данные не заполнены' : 
            `fName: ${this.fName}, lName: ${this.lName}, age: ${this.age}`}`);
    }
}

var human = new Human();
human.write('Ivan', 'Ivanov', 30);
human.print();
console.log('============\n');


// task 3
console.log('======TASK 3======');
function Fraction(a, b) {
    this.Sum = () => { return a + b; }
    this.Diff = () => { return a - b; }
    this.Multi = () => { return a * b; }
    this.Div = () => { return a / b; }
}

var fraction = new Fraction(5, 5);
console.log(fraction.Sum());
console.log(fraction.Diff());
console.log(fraction.Multi());
console.log(fraction.Div());
console.log('============\n');


// task 4
console.log('======TASK 4======');
function Journal() {
    this.listStudents = [];

    // Add
    this.AddStudent = (obj) => {
        if (this.IsAdd(obj)) { this.listStudents.push(obj); }
    };

    this.IsAdd = (obj) => {
        const index = this.listStudents.findIndex(itemStudent => itemStudent.id == obj.id);

        if (index == -1) { return true; } 
        else { console.log(`Студент с id: ${obj.id} уже есть!`); return false; }
    }
    
    // Delete
    this.DeleteStudent = (id) => {
        if (id == undefined) { return console.log('Введите id студента которого хотите удалить!'); }
        
        this.index = this.FindStudentIndexById(id);
        if (this.index != -1) {
            this.listStudents.splice(this.index, 1);

            console.log(`Студент с id: ${id} удалён! (index: ${this.index})`);
        }
    };

    // Edit
    this.EditStudent = (id, newInfo) => {
        if (id == undefined || newInfo == undefined) { return console.log('Введите id или новые данные студента!'); }
        
        this.index = this.FindStudentIndexById(id);
        if (this.index != -1) {
            this.listStudents[this.index] = {id: id, fName: newInfo.fName, lName: newInfo.lName, age: newInfo.age, group: newInfo.group};

            console.log(`Данные студента с id: ${id} изменены!! (index: ${this.index})`);
        }
    };

    // Find by id
    this.FindStudentIndexById = (id) => {
        if (id == undefined) { return console.log('Введите id студента!'); }

        const index = this.listStudents.findIndex(itemStudent => itemStudent.id == id);

        if (index == -1) { console.log(`Студент с id: ${id} не найден!`); }

        return index;
    } 
    
    // Print
    this.PrintStudents = () => { console.log(this.listStudents); };
}

var journal = new Journal();

journal.AddStudent({id: 0, fName: 'Ivan', lName: 'Ivanov', age: 30, group: 'КНП-221'});
journal.AddStudent({id: 1, fName: 'Petya', lName: 'Petrov', age: 32, group: 'КНП-221'});
journal.AddStudent({id: 2, fName: 'Stepa', lName: 'Stepan', age: 29, group: 'КНП-220'});
journal.AddStudent({id: 5, fName: 'Vasya', lName: 'Vasiliy', age: 34, group: 'КНП-220'});
journal.AddStudent({id: 5, fName: 'Vasya', lName: 'Vasiliy', age: 34, group: 'КНП-220'});
journal.PrintStudents();

journal.DeleteStudent(5);
journal.PrintStudents();

journal.EditStudent(2, {fName: 'newStepa', lName: 'newStepan', age: 49, group: 'КНП-224'});
journal.PrintStudents();
console.log('============\n');