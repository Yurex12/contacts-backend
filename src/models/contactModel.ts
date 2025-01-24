import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add the contact name.'],
    },
    email: {
      type: String,
      required: [true, 'Please add the contact email.'],
      unique: [true, 'Email has already been used.'],
    },
    phone: {
      type: String,
      required: [true, 'Please add the contact phone number.'],
    },
  },
  {
    timestamps: true,
  }
);

export default model('Contact', contactSchema);
