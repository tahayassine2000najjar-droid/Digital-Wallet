const { wallets, users } = require("../data/database");

let walletId = 1;

// CREATE WALLET
exports.createWallet = (req, res, body) => {
  const { user_id, name } = body;

  const user = users.find(u => u.id == user_id);
  if (!user) {
    res.writeHead(400);
    return res.end("User does not exist");
  }

  const newWallet = {
    id: walletId++,
    user_id,
    name,
    sold: 0
  };

  wallets.push(newWallet);

  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newWallet));
};

// GET ALL
exports.getWallets = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(wallets));
};

// GET ONE
exports.getWalletById = (req, res, id) => {
  const wallet = wallets.find(w => w.id == id);

  if (!wallet) {
    res.writeHead(404);
    return res.end("Wallet not found");
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(wallet));
};

// DELETE
exports.deleteWallet = (req, res, id) => {
  const index = wallets.findIndex(w => w.id == id);

  if (index === -1) {
    res.writeHead(404);
    return res.end("Wallet not found");
  }

  wallets.splice(index, 1);

  res.writeHead(204);
  res.end();
};

// DEPOSIT
exports.deposit = (req, res, id, body) => {
  const wallet = wallets.find(w => w.id == id);

  if (!wallet) {
    res.writeHead(404);
    return res.end("Wallet not found");
  }

  const amount = body.amount;

  if (!amount || amount <= 0) {
    res.writeHead(400);
    return res.end("Invalid amount");
  }

  wallet.sold += amount;

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(wallet));
};

// WITHDRAW
exports.withdraw = (req, res, id, body) => {
  const wallet = wallets.find(w => w.id == id);

  if (!wallet) {
    res.writeHead(404);
    return res.end("Wallet not found");
  }

  const amount = body.amount;

  if (!amount || amount <= 0) {
    res.writeHead(400);
    return res.end("Invalid amount");
  }

  if (wallet.sold < amount) {
    res.writeHead(400);
    return res.end("Insufficient balance");
  }

  wallet.sold -= amount;

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(wallet));
};