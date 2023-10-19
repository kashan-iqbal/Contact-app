const mongoose = require("mongoose");

const ContactsSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      require: true,
    },
    relation: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contacts", ContactsSchema);
