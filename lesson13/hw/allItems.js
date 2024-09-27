var mssql = require('mssql');

// connection
var connection = require('./config');

function getAllItems(req, res, table = 'Faculties') {
    let self = this;

    let request = new mssql.Request(connection);

    // Очищаем переменные перед каждым новым запросом
    self.title = ``;
    self.tableRows = ``;
    self.tableBody = ``;
    self.inputAdd = ``;
    self.inputEdit = ``;
    self.inputDelete = ``;
    
    let inputTableName = `<input type="hidden" name="table-${table}"></input>`;

    let query1 = `
        SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = '${table}';
    `;

    self.title = `${table}`;

    request.query(query1, (err, data1) => {
        data1.recordset.forEach((row, index) => {
            self.tableRows += `<td>${row.COLUMN_NAME}</td>`;

            index != 0 ?
            self.inputAdd += `<input class="add" type="text" name="add-${row.COLUMN_NAME}" placeholder="${row.COLUMN_NAME}" required /><br/>`
            : null;
            self.inputEdit += `<input class="edit" type="text" name="edit-${row.COLUMN_NAME}" placeholder="${index == 0 ? 'Select the ' + row.COLUMN_NAME : row.COLUMN_NAME }" required /><br/>`
            index == 0 ?
            self.inputDelete += `<input class="delete" type="text" name="delete-${row.COLUMN_NAME}" placeholder="${row.COLUMN_NAME}" required /><br/>`
            : null

            if (index == 0) {
                self.inputAdd += inputTableName; 
                self.inputEdit += inputTableName;
                self.inputDelete += inputTableName; 
            }
        });

        let query2 = `
            SELECT *
            FROM ${table}
        `;

        request.query(query2, (err, data2) => {
            data2.recordset.forEach(row => {
                self.tableBody += `<tr>`;
                    Object.values(row).forEach(value => {
                        self.tableBody += `<td>${value}</td>`;
                    });
                self.tableBody += `</tr>`;
            });

            console.log('show_items');
            res.render('index', {
                title: self.title,
                dataTHead: self.tableRows, dataTBody: self.tableBody,
                inputAdd: self.inputAdd, inputEdit: self.inputEdit, inputDelete: self.inputDelete
            });
        });
    });
}

module.exports = getAllItems;