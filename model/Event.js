const mongoose = require("mongoose");

const EventsSchema = new mongoose.Schema({
  eventname: {
    type: String,
    required : true,
  },
  logo: {
    type: String
  },
  date: { 
    type: String,
    required : true,
  },
  localtime: {
    type: String,
    required : true,
  },
  country: {
    type: String,
    required : true,
  },
  city: {
    type: String,
    required : true,
  },
  www: {
    type: String,
  },
  type: {
    type: String,
    required : true,
  },
  active: {
    type: String,
    required : true,
  },
  on_offline: {
    type: String,
    required : true,
  },
  link: {
    type: String,
  },
  organizerId: {
    type: String,
    required : true,
  },
  description: {
    type: String,
  },
  gen_invtitle: {
    type: String,
    required : true,
  },
  gen_invnum: {
    type: String,
    required : true,
  },
  gen_invlimit: {
    type: String,
    required : true,
  },
  gen_invvalt: {
    type: String,
    required : true,
  },
  vip_invtitle: {
    type: String,
    required : true,
  },
  vip_invnum: {
    type: String,
    required : true,
  },
  vip_invlimit: {
    type: String,
    required : true,
  },
  vip_invvalt: {
    type: String,
    required : true,
  },
  vipb_invtitle: {
    type: String,
    required : true,
  },
  vipb_invnum: {
    type: String,
    required : true,
  },
  vipb_invlimit: {
    type: String,
    required : true,
  },
  vipb_invvalt: {
    type: String,
    required : true,
  },
  offerdate: {
    type: String,
    required : true,
  },
  offerlocaltime: {
    type: String,
    required : true,
  },
});

module.exports = Events = mongoose.model("Events", EventsSchema);
