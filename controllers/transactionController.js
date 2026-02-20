// controllers/transactionController.js

const { transactions, nextTransactionId } = require('../data/transactions');
const { wallets } = require('../data/wallets');

const getAllTransactions = (req, res) => {
  res.writeHead(200);
  res.end(JSON.stringify(transactions));
};

const getTransactionsByWallet = (req, res) => {
  const walletId = parseInt(req.params.walletId);

  const walletExists = wallets.find(w => w.id === walletId);
  if (!walletExists) {
    res.writeHead(404);
    return res.end(JSON.stringify({ error: 'Wallet not found' }));
  }

  const walletTransactions = transactions.filter(
    t => t.wallet_id === walletId
  );

  res.writeHead(200);
  res.end(JSON.stringify(walletTransactions));
};

const createTransaction = (req, res) => {
  let body = '';

  req.on('data', chunk => (body += chunk));
  req.on('end', () => {
    try {
      const { wallet_id, type, amount } = JSON.parse(body);

      if (!wallet_id || !type || !amount) {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: 'wallet_id, type and amount are required' }));
      }

      const wallet = wallets.find(w => w.id === parseInt(wallet_id));
      if (!wallet) {
        res.writeHead(404);
        return res.end(JSON.stringify({ error: 'Wallet not found' }));
      }

      if (amount <= 0) {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: 'Invalid amount' }));
      }

      if (type === 'withdraw' && wallet.sold < amount) {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: 'Insufficient balance' }));
      }

      // Update wallet balance
      if (type === 'deposit') {
        wallet.sold += amount;
      } else if (type === 'withdraw') {
        wallet.sold -= amount;
      } else {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: 'Invalid transaction type' }));
      }

      const newTransaction = {
        id: nextTransactionId(),
        wallet_id: parseInt(wallet_id),
        type,
        amount,
        date: new Date()
      };

      transactions.push(newTransaction);

      res.writeHead(201);
      res.end(JSON.stringify({
        transaction: newTransaction,
        updated_wallet: wallet
      }));

    } catch (err) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Invalid JSON format' }));
    }
  });
};

module.exports = {
  getAllTransactions,
  getTransactionsByWallet,
  createTransaction
};
