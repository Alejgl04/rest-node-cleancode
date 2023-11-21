import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({

  name: {
    type: String,
    require: [true, 'Name is required']
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },

  emailValidated: {
    type: Boolean,
    default: false,
  },

  password: {
    type: String,
    required: [true, 'Password is required']
  },

  role: {
    type: [String],
    default: ['USER_ROLE'],
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },

  status: {
    type: Boolean,
    default: true,
  },

  profileImage: {
    type: String
  },

});


userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function( doc, ret, options ) {
    delete ret._id,
    delete ret.password,
    delete ret.status
  },
});

export const UserModel = mongoose.model('User', userSchema);