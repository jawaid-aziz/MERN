const http = require('http');

const server = http.createServer((req, res) => {
    console.log("Request received");
  res.end('Hello Server');
});

server.listen(8000, () => {
  console.log('Server is listening on port 8000');
}); 