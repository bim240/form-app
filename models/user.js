var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      minlength: 6,
      maxlength: 12,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      match: /@/,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // quizes: [(type: Schema.Types.ObjectId),
    // ref:quiz],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
