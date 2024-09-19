var express  = require('express');
var mssql = require('mssql');
var app = express();
var port = 8080;


// Роутеры
var allBooks = express.Router();
var bookAuthor = express.Router();
var bookPress = express.Router();

var allStudents = express.Router();
var group = express.Router();

var allTeachers = express.Router();
var allFaculties = express.Router();


// connection
var connection = require('./config');


function dataResult(requestByAuthorName, ps, res) {
    ps.prepare(requestByAuthorName, (err) => {
        if (err) { console.error(err); }

        ps.execute({}, (err, data) => {
            if (err) { console.error(err); }

            console.log('Prepared statement executed');
            res.send(data.recordset); 
        })
    });
}

// All books
allBooks.route('/').get(function(req, res) {
    connection.connect(function(err) {
        var ps = new mssql.PreparedStatement(connection);
        ps.input('nameAuthor', mssql.NVarChar);

        let requestByAuthorName = `
            SELECT *
            FROM Books
        `;

        dataResult(requestByAuthorName, ps, res);
    });
});
app.use('/allBooks', allBooks);


// Book author
bookAuthor.route('/').get(function(req, res) {
    connection.connect(function(err) {
        var ps = new mssql.PreparedStatement(connection);
        ps.input('nameAuthor', mssql.NVarChar);

        let requestByAuthorName = `
            SELECT * 
            FROM Authors
        `;

        dataResult(requestByAuthorName, ps, res);
    });
});
bookAuthor.route('/:author').get(function(req, res) {
    connection.connect(function(err) {
        var ps = new mssql.PreparedStatement(connection);
        ps.input('nameAuthor', mssql.NVarChar);

        let requestByAuthorName = `
            SELECT Books.Name, Authors.FirstName, Authors.LastName 
            FROM Books JOIN Authors 
            ON Books.Id_Author = Authors.Id
            WHERE Authors.FirstName = '${req.params.author}'
        `;

        dataResult(requestByAuthorName, ps, res);
    });
});
app.use('/book', bookAuthor);


// Book press
bookPress.route('/').get(function(req, res) {
    connection.connect(function(err) {
        var ps = new mssql.PreparedStatement(connection);
        ps.input('nameAuthor', mssql.NVarChar);

        let requestByAuthorName = `
            SELECT *
            FROM Press
        `;

        dataResult(requestByAuthorName, ps, res);
    });
});
app.use('/press', bookPress);
bookPress.route('/:namePress').get(function(req, res) {
    connection.connect(function(err) {
        var ps = new mssql.PreparedStatement(connection);
        ps.input('nameAuthor', mssql.NVarChar);

        let requestByAuthorName = `
            SELECT Books.Name, Authors.FirstName, Authors.LastName, Press.Name
            FROM Books JOIN Authors 
            ON Books.Id_Author = Authors.Id JOIN Press
            ON Books.id_Press = Press.id
            WHERE Press.Name = '${req.params.namePress}'
        `;

        dataResult(requestByAuthorName, ps, res);
    });
});
app.use('/press', bookPress);


// All students
allStudents.route('/').get(function(req, res) {
    connection.connect(function(err) {
        var ps = new mssql.PreparedStatement(connection);
        ps.input('nameAuthor', mssql.NVarChar);

        let requestByAuthorName = `
            SELECT *
            FROM Students
        `;

        dataResult(requestByAuthorName, ps, res);
    });
});
app.use('/allStudents', allStudents);


// Group
group.route('/').get(function(req, res) {
    connection.connect(function(err) {
        var ps = new mssql.PreparedStatement(connection);
        ps.input('nameAuthor', mssql.NVarChar);

        let requestByAuthorName = `
            SELECT * 
            FROM Groups
        `;

        dataResult(requestByAuthorName, ps, res);
    });
});
group.route('/:nameGroup').get(function(req, res) {
    connection.connect(function(err) {
        var ps = new mssql.PreparedStatement(connection);
        ps.input('nameAuthor', mssql.NVarChar);

        let requestByAuthorName = `
            SELECT *
            FROM Groups JOIN Students
            ON Students.Id_Group = Groups.Id
            WHERE Groups.Name =  '${req.params.nameGroup}'
        `;

        dataResult(requestByAuthorName, ps, res);
    });
});
app.use('/group', group);


// All teachers
allTeachers.route('/').get(function(req, res) {
    connection.connect(function(err) {
        var ps = new mssql.PreparedStatement(connection);
        ps.input('nameAuthor', mssql.NVarChar);

        let requestByAuthorName = `
            SELECT *
            FROM Teachers
        `;

        dataResult(requestByAuthorName, ps, res);
    });
});
app.use('/allTeachers', allTeachers);


// All faculties
allFaculties.route('/').get(function(req, res) {
    connection.connect(function(err) {
        var ps = new mssql.PreparedStatement(connection);
        ps.input('nameAuthor', mssql.NVarChar);

        let requestByAuthorName = `
            SELECT *
            FROM Faculties
        `;

        dataResult(requestByAuthorName, ps, res);
    });
});
app.use('/allFaculties', allFaculties);


app.listen(port, function() {
    console.log('app listening on port ' + port);
});