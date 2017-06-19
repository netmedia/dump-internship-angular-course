const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  rentedItems: [{ type: ObjectId, required: true, ref: "Item" }]
});

mongoose.model("User", schema);
