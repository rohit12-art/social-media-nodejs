const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  avatar: {
    public_id: String,
    url: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters"],
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
  ],

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
