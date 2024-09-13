var express = require('express');
var fs = require('fs');
var app = express();

function findSpecs(data, searchName) {
    let lowerCaseData = data.toLowerCase();
    let blocks = lowerCaseData.split('=');
    let result = '';

    blocks.forEach(block => {
        if (block.includes(searchName.toLowerCase())) { result += block; }
    });

    return result.length != 0 ? result : -1;
}

app.get('/name/:name', function(request, response){
    console.log(`keyWord: ${request.params.name}`);

    fs.readFile('products.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        res = findSpecs(data, request.params.name).toString();

        console.log(res);
        response.send(res);
    });
});

app.listen(8080);