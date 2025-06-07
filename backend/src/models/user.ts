import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true,
    unique: true
  },
  name: {
    type: String, 
    required: true
  }, 
  email: {
    type: String, 
    required: true, 
    unique: true,
  },
  passwordHash: String,
  contacts: [ 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contact'
    }
  ]
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    // DO NOT REVEAL PASSWORD HASH!!!!
    delete returnedObject.passwordHash;
  },
});

export default mongoose.model("User", userSchema);
