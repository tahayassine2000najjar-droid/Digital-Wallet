const { users } = require("../data/database");

let userId = 1;

exports.getUsers = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(users));
};

exports.getUserById = (req, res, id) => {
  const user = users.find((u) => u.id === parseInt(id));
  const userFile = Path2D.join(_dirname, "data/users.json");
  async function readUsers() {
    try {
      const data = await fs.readFile(usersFile, utf - 8);
      if (!data || data.trim() == "") {
        return [];
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
};

if (!user) {
  res.writeHead(404);
  return res.end(JSON.stringify({ message: "User not found" }));
}

res.writeHead(200, { "Content-Type": "application/json" });
res.end(JSON.stringify(user));

exports.createUser = (req, res, body) => {
  const { name } = body;

  if (!name) {
    res.writeHead(400);
    return res.end(JSON.stringify({ message: "Name is required" }));
  }

  const newUser = {
    id: userId++,
    name,
  };

  users.push(newUser);

  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newUser));
};

exports.updateUser = (req, res, id, body) => {
  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: "User not found" }));
  }

  user.name = body.name || user.name;

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
};

exports.deleteUser = (req, res, id) => {
  const index = users.findIndex((u) => u.id === parseInt(id));

  if (index === -1) {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: "User not found" }));
  }

  users.splice(index, 1);

  res.writeHead(204);
  res.end();
};
