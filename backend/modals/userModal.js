const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC_GTSOMv5MWxOHBLROf2ExOHFKpZpaDqQRw&s",
    },
  },
  { timestamps: true }
);

// Method to compare entered password with the stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash the password before saving if it has been modified
userSchema.pre("save", async function (next) {
  // Check if password is modified
  if (!this.isModified("password")) {
    return next(); // If the password has not been modified, skip hashing
  }

  // Hash the password with bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next(); // Proceed with saving the user
});

const User = mongoose.model("User", userSchema);

module.exports = User;
