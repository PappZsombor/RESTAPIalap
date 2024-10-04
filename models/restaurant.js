const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  restaurant: {
    required: true,
    type: String,
  },
  adress: {
    required: true,
    type: String,
  },
  rating: {
    required: true,
    type: Number,
  },
});
module.exports = mongoose.model("Reastaurant", restaurantSchema);
