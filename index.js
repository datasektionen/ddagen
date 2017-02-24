const app = require('express')();

const hostname = '127.0.0.1';
const port = process.env.PORT;

app.get('/', (req, res) => {
  console.log('Hello World')
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
