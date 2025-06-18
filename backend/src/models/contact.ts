import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 11,
    validate: {
      validator: function (v: string) {
        return /^\d{2,3}-(\d+)$/.test(v);
      },
      message: () => "Wrong format (123-1234567).",
    },
  },

  belongsTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

contactSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model("Contact", contactSchema);
