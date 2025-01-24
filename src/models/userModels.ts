import mongoose, { model, Schema } from 'mongoose';

const userModel = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a username.'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email address.'],
      unique: [true, 'Email already taken.'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  { timestamps: true }
);

export default model('User', userModel);
