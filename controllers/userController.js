const { users } = require("../data/database");

let userId = 1;

// CREATE
exports.createUser = (req, res, body) => {
  const { name } = body;

  if (!name) {
    res.writeHead(400);
    return res.end("Name is required");
  }

  const newUser = {
    id: userId++,
    name
  };

  users.push(newUser);

  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newUser));
};

// READ ALL
exports.getUsers = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(users));
};

// READ ONE
exports.getUserById = (req, res, id) => {
  const user = users.find(u => u.id == id);

  if (!user) {
    res.writeHead(404);
    return res.end("User not found");
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
};

// UPDATE
exports.updateUser = (req, res, id, body) => {
  const user = users.find(u => u.id == id);

  if (!user) {
    res.writeHead(404);
    return res.end("User not found");
  }

  user.name = body.name || user.name;

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
};

// DELETE
exports.deleteUser = (req, res, id) => {
  const index = users.findIndex(u => u.id == id);

  if (index === -1) {
    res.writeHead(404);
    return res.end("User not found");
  }

  users.splice(index, 1);

  res.writeHead(204);
  res.end();
};