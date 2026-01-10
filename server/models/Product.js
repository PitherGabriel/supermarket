const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number }, // To show "was $X.XX"
  unitPrice: { type: String },     // e.g., "$1.50 / 100g"
  discountText: { type: String },  // e.g., "SAVE 20%"
  description: { type: String },
  image: { type: String },         // URL to the image
  isWeeklyOffer: { type: Boolean, default: false },
  stockStatus: { type: String, enum: ['In Stock', 'Limited', 'Out of Stock'], default: 'In Stock' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);