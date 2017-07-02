const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const rentalSchema = new Schema({
  user: { type: ObjectId, required: true, ref: "User" },
  date: Date
});

const schema = new Schema({
  name: { type: String, required: true },
  price: {
    amount: Number,
    currency: String
  },
  boughtDate: Date,
  warrantyUntilDate: Date,
  rentedTo: { type: rentalSchema },
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
