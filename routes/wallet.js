const express = require("express");
const router = express.Router();
const Wallets = require("../model/Wallet");

router.get("/getallwallets", async (req, res) => {
  try {
    const wallets = await Wallets.find();
    res.status(200).json(wallets);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getwallet/:id", async (req, res) => {
  try {
    const wallet = await Wallets.findById({ _id: req.params.id });
    res.status(200).json(wallet);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/addwallet", async (req, res) => {
  console.log("=========Wallets==========", req.body);
  const address = req.body.address;
  const ether = req.body.ether;
  const bnb = req.body.bnb;
  const bep20_usdt = req.body.bep20_usdt;
  const valt = req.body.valt;

  try {
    const existingWallet = await Wallets.findOne({ address });

    if (existingWallet) {
      existingWallet.ether = ether;
      existingWallet.bnb = bnb;
      existingWallet.bep20_usdt = bep20_usdt;
      existingWallet.valt = valt;
      await existingWallet.save();
      return res.status(200).json({
        message: "Wallet updated successfully",
        wallet: existingWallet,
      });
    } else {
      const newWallet = new Wallets({
        address,
        ether,
        bnb,
        bep20_usdt,
        valt,
      });
      await newWallet.save();
      return res
        .status(201)
        .json({ message: "Wallet added successfully", wallet: newWallet });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error during addition" });
  }
});

router.post("/update_wallet", async (req, res) => {
  try {
    console.log("=========Wallets==========", req.body);

    const updatedWallet = await Wallets.findOneAndUpdate(
      { address: req.body.address },
      { $set: { ...req.body } },
      { new: true }
    );

    if (!updatedWallet) {
      return res.status(201).json({ message: "Wallet not found" });
    }

    res
      .status(200)
      .json({ message: "Wallet updated successfully", wallet: updatedWallet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete_wallet/:id", async (req, res) => {
  try {
    const deletedWallet = await Wallets.findByIdAndDelete(req.params.id);

    if (!deletedWallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    res
      .status(200)
      .json({ message: "Wallet deleted successfully", deletedWallet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
