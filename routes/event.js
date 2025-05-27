const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const router = express.Router();
const path = require("path");
const Events = require("../model/Event");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/"); // Store files in 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File upload settings
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max file size
  fileFilter: (req, file, cb) => {
    console.log("=========FILE=========", file);
    const allowedTypes = /jpeg|jpg|png/;
    const extName = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error("Only JPEG, JPG, and PNG files are allowed!"));
    }
  },
});

router.post("/upload", upload.single("avatar"), async (req, res) => {
  const logo = req.file ? `/uploads/images/${req.file.filename}` : "";

  return res.status(200).json({ message: "Logo uploaded successfully", logo });
});

router.get("/getallevents", async (req, res) => {
  try {
    const events = await Events.aggregate([
      {
        $lookup: {
          from: "organizers",
          localField: "organizerId",
          foreignField: "organizerId",
          as: "organizer",
        },
      },
    ]);
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getevent/:id", async (req, res) => {
  try {
    const events = await Events.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "organizers",
          localField: "organizerId",
          foreignField: "organizerId",
          as: "organizer",
        },
      },
    ]);
    res.status(200).json(events[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/addevent", async (req, res) => {
  console.log("=========Events==========", req.body);

  try {
    const newEvent = new Events({
      ...req.body,
    });
    await newEvent.save();
    return res
      .status(200)
      .json({ message: "Event added successfully", newEvent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error during addition" });
  }
});

router.put("/update_event/:id", async (req, res) => {
  try {
    console.log("=========Events==========", req.body);

    const updatedEvent = await Events.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body },
      },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res
      .status(200)
      .json({ message: "Event updated successfully", updatedEvent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete_event/:id", async (req, res) => {
  try {
    const deletedEvent = await Events.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res
      .status(200)
      .json({ message: "Event deleted successfully", deletedEvent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
