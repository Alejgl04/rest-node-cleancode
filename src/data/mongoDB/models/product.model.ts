import mongoose, { Schema } from 'mongoose';


const productSchema = new mongoose.Schema({

  name: {
    type: String,
    require: [true, 'Name is required'],
    unique: true
  },

  available: {
    type: Boolean,
    defaul: false,
  },

  price: {
    type: Number,
    defaul: 0,
  },

  description: {
    type: String,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }


});

export const ProductModel = mongoose.model('Product', productSchema);