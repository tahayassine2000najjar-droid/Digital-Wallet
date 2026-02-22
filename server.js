const http = require("http");
const userRoutes = require("./routes/userRoutes");
const walletRoutes = require("./routes/walletRoutes");

const server = http.createServer((req, res) => {
  let body = "";

  req.on("data", chunk => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      body = body ? JSON.parse(body) : {};
    } catch (error) {
      res.writeHead(400);
      return res.end("Invalid JSON");
    }

    // Routes
    userRoutes(req, res, body);
    walletRoutes(req, res, body);

    if (!res.writableEnded) {
      res.writeHead(404);
      res.end("Route not found");
    }
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});