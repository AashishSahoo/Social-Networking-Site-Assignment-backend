const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  mobileNo: String,
  address: String,
  password: { type: String, required: true },
  roleType: {
    type: String,
    enum: ["admin", "restro-owner", "customer"],
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
