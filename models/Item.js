const pick = require("lodash/pick");
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

const filterProps = data => pick(data, [
  "name",
  "price",
  "boughtDate",
  "warrantyUntilDate"
]);

Object.assign(schema.statics, {
  createInstance(data) {
    return this.create(filterProps(data));
  },

  updateInstance(id, data) {
    return this.findByIdAndUpdate(id, filterProps(data), { new: true });
  }
});

mongoose.model("Item", schema);
