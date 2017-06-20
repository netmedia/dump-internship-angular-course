const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  price: {
    amount: Number,
    currency: String
  },
  boughtDate: Date,
  warrantyUntilDate: Date,
  rentedTo: {
    user: { type: ObjectId, required: true, ref: "User" },
    date: Date
  },
  rentHistory: [{
    user: {
      id: { type: ObjectId, required: true }, // no ref, cached data
      name: String
    },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true }
  }]
});

mongoose.model("Item", schema);
