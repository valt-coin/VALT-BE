const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  ether: {
    type: String,
    required: true,
    default: "0",
  },
  bnb: {
    type: String,
    required: true,
    default: "0",
  },
  bep20_usdt: {
    type: String,
    required: true,
    default: "0",
  },
  valt: {
    type: String,
    required: true,
    default: "0",
  },
});

module.exports = mongoose.model("Wallet", WalletSchema);
