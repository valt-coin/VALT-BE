const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const bodyParser = require('body-parser');
const events = require("./routes/event");
const organizers = require("./routes/organizer");
const purchases = require("./routes/purchase");
const wallets = require("./routes/wallet");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));

app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "uploads/images"))
);

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "VALTdatabase",
  })
  .then(() => {
    console.log("Running");
  })
  .catch((err) => {
    console.log(err);
  });

const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use("/", events);
app.use("/", organizers);
app.use("/", purchases);
app.use("/", wallets);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
