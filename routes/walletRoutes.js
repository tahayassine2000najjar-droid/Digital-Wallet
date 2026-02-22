const walletController = require("../controllers/walletController");

module.exports = (req, res, body) => {
  const url = req.url;
  const method = req.method;

  if (url === "/wallets" && method === "GET") {
    return walletController.getWallets(req, res);
  }

  if (url === "/wallets" && method === "POST") {
    return walletController.createWallet(req, res, body);
  }

  if (url.startsWith("/wallets/")) {
    const parts = url.split("/");
    const id = parts[2];

    if (parts.length === 3) {
      if (method === "GET")
        return walletController.getWalletById(req, res, id);

      if (method === "DELETE")
        return walletController.deleteWallet(req, res, id);
    }

    if (parts[3] === "deposit" && method === "POST") {
      return walletController.deposit(req, res, id, body);
    }

    if (parts[3] === "withdraw" && method === "POST") {
      return walletController.withdraw(req, res, id, body);
    }
  }
};