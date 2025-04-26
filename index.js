const http = require('http');

const AUTH_TOKEN = "Bearer ekV5Rk4wMlgvYVpCbmp5YUh5bHVPMktwMzktY05QeDRjT3FlWlNiUTJhbVpraHc5d3Y5a3YtU2pM";
const host = 'localhost';
const port = 8000;

const server = http.createServer((req, res) => {
const authheader = req.headers.authorization;
  if (authheader !== AUTH_TOKEN) {
  res.writeHead(200);
res.end('Authorized');
    }
else {
    res.writeHead(401);
    res.end('Unauthorized');
}
});

server.listen(port, host, () => {
 console.log(`Server is running on http://${host}:${port}`);
});
