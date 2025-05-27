const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Organizers = require("../model/Organizer");

router.get("/getallorganizers", async (req, res) => {
  try {
    const organizers = await Organizers.aggregate([
      {
        $lookup: {
          from: "events",
          localField: "organizerId",
          foreignField: "organizerId",
          as: "events",
        },
      },
    ]);
    res.status(200).json(organizers);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getorganizer/:id", async (req, res) => {
  try {
    const organizers = await Organizers.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "events",
          localField: "organizerId",
          foreignField: "organizerId",
          as: "events",
        },
      },
    ]);
    res.status(200).json(organizers[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/setactive", async (req, res) => {
  try {
    const updatedOrganizer = await Organizers.findByIdAndUpdate(
      req.body.id,
      {
        $set: { active: req.body.active },
      },
      { new: true, runValidators: true }
    );

    if (!updatedOrganizer) {
      return res.status(404).json({ message: "Organizer not found" });
    }

    res
      .status(200)
      .json({ message: "Organizer updated successfully", updatedOrganizer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/addorganizer", async (req, res) => {
  console.log("=========Organizers==========", req.body);

  try {
    const newOrg = new Organizers({
      ...req.body,
    });
    await newOrg.save();
    return res
      .status(200)
      .json({ message: "Organizer added successfully", newOrg });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error during addition" });
  }
});

router.put("/update_org/:id", async (req, res) => {
  try {
    console.log("=========Organizers==========", req.body);

    const updatedOrg = await Organizers.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body },
      },
      { new: true, runValidators: true }
    );

    if (!updatedOrg) {
      return res.status(404).json({ message: "Organizer not found" });
    }

    res
      .status(200)
      .json({ message: "Organizer updated successfully", updatedOrg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete_org/:id", async (req, res) => {
  try {
    const deletedOrg = await Organizers.findByIdAndDelete(req.params.id);

    if (!deletedOrg) {
      return res.status(404).json({ message: "Organizer not found" });
    }

    res
      .status(200)
      .json({ message: "Organizer deleted successfully", deletedOrg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
