// routes/transactionRoutes.js

const transactionController = require('../controllers/transactionController');

function transactionRoutes(req, res) {
  const { method, url } = req;

  // GET /transactions
  if (method === 'GET' && url === '/transactions') {
    return transactionController.getAllTransactions(req, res);
  }

  // GET /wallets/:walletId/transactions
  const walletTransactionsMatch = url.match(/^\/wallets\/(\d+)\/transactions$/);
  if (method === 'GET' && walletTransactionsMatch) {
    req.params = { walletId: walletTransactionsMatch[1] };
    return transactionController.getTransactionsByWallet(req, res);
  }

  // POST /transactions
  if (method === 'POST' && url === '/transactions') {
    return transactionController.createTransaction(req, res);
  }

  return null;
}

module.exports = transactionRoutes;
