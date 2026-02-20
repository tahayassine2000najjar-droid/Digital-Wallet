const userController = require('../controllers/userController');

module.exports = (req, res, body) => {
  const urlParts = req.url.split('/');
  const id = urlParts[2];

  if (req.method === 'GET' && req.url === '/users') {
    return userController.getUsers(req, res);
  }

  if (req.method === 'GET' && id) {
    return userController.getUserById(req, res, id);
  }

  if (req.method === 'POST' && req.url === '/users') {
    return userController.createUser(req, res, body);
  }

  if (req.method === 'PUT' && id) {
    return userController.updateUser(req, res, id, body);
  }

  if (req.method === 'DELETE' && id) {
    return userController.deleteUser(req, res, id);
  }
};