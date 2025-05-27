const express = require("express");
const router = express.Router();
const Purchases = require("../model/Purchase");

router.get("/getallpurchases", async (req, res) => {
  try {
    const purchases = await Purchases.find();
    res.status(200).json(purchases);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getpurchase/:id", async (req, res) => {
  try {
    const purchase = await Purchases.findById({ _id: req.params.id });
    res.status(200).json(purchase);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/addpurchase", async (req, res) => {
  console.log("=========Purchases==========", req.body);

  try {
    const newPurchase = new Purchases({
      ...req.body,
      timestamp: new Date().toLocaleString(),
    });
    await newPurchase.save();
    return res
      .status(200)
      .json({ message: "Purchase added successfully", newPurchase });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error during addition" });
  }
});

module.exports = router;
