const walletController = require('../controllers/walletController');

module.exports = (req, res, body) => {
  const urlParts = req.url.split('/');
  const id = urlParts[2];

  if (req.method === 'GET' && req.url === '/wallets') {
    return walletController.getWallets(req, res);
  }

  if (req.method === 'POST' && req.url === '/wallets') {
    return walletController.createWallet(req, res, body);
  }

  if (req.method === 'POST' && urlParts[3] === 'deposit') {
    return walletController.deposit(req, res, id, body);
  }

  if (req.method === 'POST' && urlParts[3] === 'withdraw') {
    return walletController.withdraw(req, res, id, body);
  }

  if (req.method === 'DELETE' && id) {
    return walletController.deleteWallet(req, res, id);
  }
};