import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: () => "Please enter a valid email address",
      },
    },
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9]+$/.test(v);
        },
        message: () => "Username can only contains alphabets and numbers",
      },
      minlength: [6, "Minimum username length is 6 characters"],
      maxlength: [20, "Maximum username length is 20 characters"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    likes: {
      type: [mongoose.ObjectId],
      default: [],
    },
    postsCount: {
      type: Number,
      default: 0,
    },
    receivedReq: {
      type: [mongoose.ObjectId],
      default: [],
    },
    sentReq: {
      type: [mongoose.ObjectId],
      default: [],
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    nfReadTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const bool = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const user = bool
    ? await this.findOne({ email })
    : await this.findOne({ username: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error(bool ? "incorrect email" : "incorrect username");
};

const User = mongoose.model("user", userSchema);

export default User;
