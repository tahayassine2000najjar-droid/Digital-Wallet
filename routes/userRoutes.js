const userController = require("../controllers/userController");

module.exports = (req, res, body) => {
  const url = req.url;
  const method = req.method;

  if (url === "/users" && method === "GET") {
    return userController.getUsers(req, res);
  }

  if (url === "/users" && method === "POST") {
    return userController.createUser(req, res, body);
  }

  if (url.startsWith("/users/")) {
    const id = url.split("/")[2];

    if (method === "GET")
      return userController.getUserById(req, res, id);

    if (method === "PUT")
      return userController.updateUser(req, res, id, body);

    if (method === "DELETE")
      return userController.deleteUser(req, res, id);
  }
};