// core modules
const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
    },
    // photo: Array,

    photo: {
      type: Array,
      default: null,
    },
    cover_photo: Array,
    bio: String,
  },
  { timestamps: true },
)
// {
//   toJSON: { virtuals: true }
//   toObject: { virtuals: true }
// }
// userSchema.virtual('posts', {
//   ref: 'Post',
//   foreignField: 'user',
//   localField: '_id'
// });

userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user'
})

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

module.exports = userSchema;
