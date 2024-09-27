var express  = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mssql = require('mssql');
var path = require('path');
var app = express();
var port = 8080;

// connection
var connection = require('./config');
const getAllItems = require('./AllItems');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index', { 
        title: 'Default',
        dataTHead: null, dataTBody: null,
        inputAdd: null, inputEdit: null, inputDelete: null
    });
});

// Маршрут для главной страницы
app.post('/', function(req, res) {
    const table = req.body.table;
    console.log(`Table: ${table}`);

    getAllItems(req, res, table);

    connection.connect(function(err) {
        if (err) { console.error('Error connecting to the database:', err); }
    });
});


function printFilterInput(data, prefix) {
    return Object.entries(data)
        .filter(([key, value]) => key.startsWith(`${prefix}-`))
        .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});
}
function returnKeys(obj) {
    return Object.keys(obj);
}
function removePrefix(data, prefix) {
    return data
        .filter(key => key.startsWith(`${prefix}-`))
        .map(key => key.replace(`${prefix}-`, ''));
}
function executeReq(ps, query, inserts, message) {
    var transaction = new mssql.Transaction(connection);

    transaction.begin(function (err) {
        ps.prepare(query, function (err) {
            if (err) {
                console.log(err);
                transaction.rollback(function(err) {
                    console.log('rollback successful');
                });
            } else {
                transaction.commit(function(err, data) {
                    ps.execute(inserts, function (err) {
                        if (err) console.log(err);

                        console.log(`${message}`);

                        ps.unprepare();
                    });
                });
            }
        });
    });
}


// add
app.post('/add', function(req, res) {
    const ps = new mssql.PreparedStatement(connection);

    const body = req.body;

    // Фильтруем только те поля, у которых name начинается на 'add-'
    const data = printFilterInput(body, 'add');
    console.log(data);

    // Фильтруем только те поля, у которых name начинается на 'table-'
    const tableName = printFilterInput(body, 'table');
    console.log(tableName);


    // Возвращаем ключи полей
    const keysData = returnKeys(data);
    console.log(keysData);

    // Возвращаем ключ(название) таблицы
    const keyNameTable = returnKeys(tableName);
    console.log(keyNameTable);


    // Удаление префиксов
    const removeAdd = removePrefix(keysData, 'add');
    console.log(removeAdd);

    // Удаление префиксов
    const removeTable = removePrefix(keyNameTable, 'table');
    console.log(removeTable);


    let query = `
        INSERT INTO ${removeTable} (${removeAdd.join(', ')})
        VALUES (${removeAdd.map(item => `@${item}`).join(', ')})
    `;
    console.log(query);


    const inserts = {};

    // Заполнение inserts и ps.input
    removeAdd.forEach(element => {
        // Определяем тип параметра
        const paramType = typeof element === 'number' ? mssql.Int : mssql.NVarChar;
        const dataKey = `add-${element}`;

        ps.input(element, paramType);

        inserts[element] = data[dataKey];
    });
    console.log(inserts);


    executeReq(ps, query, inserts, 'add item')

    res.send('Add item');
});


// edit
app.post('/edit', function(req, res) {
    const ps = new mssql.PreparedStatement(connection);

    const body = req.body;

    // Фильтруем только те поля, у которых name начинается на 'edit-'
    const data = printFilterInput(body, 'edit');
    console.log(data);

    // Фильтруем только те поля, у которых name начинается на 'table-'
    const tableName = printFilterInput(body, 'table');
    console.log(tableName);


    // Возвращаем ключи полей
    const keysData = returnKeys(data);
    console.log(keysData);

    // Возвращаем ключ(название) таблицы
    const keyNameTable = returnKeys(tableName);
    console.log(keyNameTable);


    // Удаление префиксов
    const removeAdd = removePrefix(keysData, 'edit');
    console.log(removeAdd);

    // Удаление префиксов
    const removeTable = removePrefix(keyNameTable, 'table');
    console.log(removeTable);


    let query = `
        UPDATE ${removeTable}
        SET ${removeAdd.slice(1).map(item => `${item}=@${item}`).join(', ')}
        WHERE ${removeAdd[0]}=@${removeAdd[0]};
    `;
    console.log(query);


    const inserts = {};

    // Заполнение inserts и ps.input
    removeAdd.forEach(element => {
        // Определяем тип параметра
        const paramType = typeof element === 'number' ? mssql.Int : mssql.NVarChar;
        const dataKey = `edit-${element}`;

        ps.input(element, paramType);

        inserts[element] = data[dataKey];
    });
    console.log(inserts);


    executeReq(ps, query, inserts, 'Edit item');

    res.send('Edit item');
});


// delete
app.post('/delete', function(req, res) {
    const ps = new mssql.PreparedStatement(connection);

    const body = req.body;

    // Фильтруем только те поля, у которых name начинается на 'edit-'
    const data = printFilterInput(body, 'delete');
    console.log(data);

    // Фильтруем только те поля, у которых name начинается на 'table-'
    const tableName = printFilterInput(body, 'table');
    console.log(tableName);


    // Возвращаем ключи полей
    const keysData = returnKeys(data);
    console.log(keysData);

    // Возвращаем ключ(название) таблицы
    const keyNameTable = returnKeys(tableName);
    console.log(keyNameTable);


    // Удаление префиксов
    const removeAdd = removePrefix(keysData, 'delete');
    console.log(removeAdd);

    // Удаление префиксов
    const removeTable = removePrefix(keyNameTable, 'table');
    console.log(removeTable);


    let query = `
        DELETE FROM ${removeTable}
        WHERE ${removeAdd[0]}=@${removeAdd[0]};
    `;
    console.log(query);


    const inserts = {};

    // Заполнение inserts и ps.input
    removeAdd.forEach(element => {
        // Определяем тип параметра
        const paramType = typeof element === 'number' ? mssql.Int : mssql.NVarChar;
        const dataKey = `delete-${element}`;

        ps.input(element, paramType);

        inserts[element] = data[dataKey];
    });
    console.log(inserts);

    executeReq(ps, query, inserts, 'Delete item');

    res.send('Delete item');
});


app.listen(port, function() {
    console.log('app listening on port ' + port);
});