const mongoose = require("mongoose");

const PurchasesSchema = new mongoose.Schema({
  wallet_address: {
    type: String,
    required: true,
  },
  event_id: {
    type: String,
    required: true,
  },
  event_ticket: {
    type: String,
    required: true,
  },
  purchase_invcnt: {
    type: String,
    required: true,
  },
  purchase_valtcnt: { 
    type: String, 
    required: true 
  },
  organizerId: {
    type: String,
    required: true,
  },
  transaction: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

module.exports = Purchases = mongoose.model("Purchases", PurchasesSchema);
