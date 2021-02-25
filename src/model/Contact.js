const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  contactId: {
    type: String,
    required: true,
  },

  partnerId: {
    type: String,
    default: null,
  },

  status: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
