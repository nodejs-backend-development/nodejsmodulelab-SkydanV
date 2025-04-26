const http = require('http');
const fs = require('fs');
const split2 = require('split2'); 
const through2 = require('through2');
const path = require('path');

const server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        const file = path.join(__dirname, 'lab25.csv');
        let headers = [];
        const data = [];

        res.writeHead(200, { 'Content-Type': 'application/json' });

        fs.createReadStream(file)
            .pipe(split2())
            .pipe(through2.obj(function (line, _, next) {
                const parts = line.toString().split(',');
                if (headers.length === 0) {
                    headers = parts;
                } else {
                    const obj = {};
                    for (let i = 0; i < parts.length; i++) {
                        obj[headers[i]] = parts[i].trim();
                    }
                    data.push(obj);
                }
                next();
            }))
            .on('finish', function () {
                res.end(JSON.stringify(data));
            })
            .on('error', function () {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Something went wrong...');
            });

    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Only GET is allowed');
    }
});

server.listen(3001, function () {
    console.log('Server is working at http://localhost:3001');
});
