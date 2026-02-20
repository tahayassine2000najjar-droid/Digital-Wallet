const http = require('http');
const userRoutes = require('./routes/userRoutes');
const walletRoutes = require('./routes/walletRoutes');

const server = http.createServer((req, res) => {

  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {

    if (body) {
      try {
        body = JSON.parse(body);
      } catch (err) {
        res.writeHead(400);
        return res.end(JSON.stringify({ message: 'Invalid JSON' }));
      }
    }

    if (req.url.startsWith('/users')) {
      return userRoutes(req, res, body);
    }

    if (req.url.startsWith('/wallets')) {
      return walletRoutes(req, res, body);
    }

    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found' }));
  });

});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});