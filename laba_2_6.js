const http = require('http');
const url = require('url');
const CustomStream = require('./CustomStream');

const host = 'localhost';
const port = 3002;

const myStream = new CustomStream();

const server = http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (process.stdin.listenerCount('data') === 0) {
        process.stdin.pipe(myStream);
    }

    res.end('Waiting for input. Write in console.');
});

server.listen(port, host, function () {
    console.log('Server running at http://' + host + ':' + port);
});

