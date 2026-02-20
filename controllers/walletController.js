const { wallets, users } = require('../data/database');

let walletId = 1;

exports.getWallets = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(wallets));
};

exports.createWallet = (req, res, body) => {
  const { user_id, name } = body;

  const user = users.find(u => u.id === parseInt(user_id));

  if (!user) {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: 'User not found' }));
  }

  const newWallet = {
    id: walletId++,
    user_id: parseInt(user_id),
    name,
    sold: 0
  };

  wallets.push(newWallet);

  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newWallet));
};

exports.deposit = (req, res, id, body) => {
  const wallet = wallets.find(w => w.id === parseInt(id));

  if (!wallet) {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: 'Wallet not found' }));
  }

  const amount = parseFloat(body.amount);

  if (amount <= 0) {
    res.writeHead(400);
    return res.end(JSON.stringify({ message: 'Invalid amount' }));
  }

  wallet.sold += amount;

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(wallet));
};

exports.withdraw = (req, res, id, body) => {
  const wallet = wallets.find(w => w.id === parseInt(id));

  if (!wallet) {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: 'Wallet not found' }));
  }

  const amount = parseFloat(body.amount);

  if (amount <= 0 || wallet.sold < amount) {
    res.writeHead(400);
    return res.end(JSON.stringify({ message: 'Insufficient balance or invalid amount' }));
  }

  wallet.sold -= amount;

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(wallet));
};

exports.deleteWallet = (req, res, id) => {
  const index = wallets.findIndex(w => w.id === parseInt(id));

  if (index === -1) {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: 'Wallet not found' }));
  }

  wallets.splice(index, 1);

  res.writeHead(204);
  res.end();
};