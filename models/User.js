const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  rentedItems: [{ type: ObjectId, required: true, ref: "Item" }]
});

// does not cover update methods, only save!
schema.pre("save", function (next) {
  if (!this.isModified("password"))
    return next();

  return bcrypt.hash(this.password, 10)
    .then(hashed => {
      this.password = hashed;
      return next();
    });
});

schema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

mongoose.model("User", schema);
