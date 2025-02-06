const http = require('http');

const server = http.createServer((req, res) => {
    console.log("Request received");
  if(req.url === '/next')
  {
    res.end("This is for the NEXT path");
  }
});

server.listen(8000, () => {
  console.log('Server is listening on port 8000');
});

