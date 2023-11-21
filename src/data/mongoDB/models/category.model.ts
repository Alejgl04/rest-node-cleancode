import mongoose, { Schema } from 'mongoose';


const categorySchema = new mongoose.Schema({

  name: {
    type: String,
    require: [true, 'Name is required'],
    unique: true
  },

  available: {
    type: Boolean,
    defaul: false,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }


});

export const CategoryModel = mongoose.model('Category', categorySchema);