const mongoose = require('mongoose');
// models/hoot.js

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  historicalSites:{
    type: String, 
    required: false,
  },
  entertainment: {
    type: String,
    required: false
  },
  food: {
    type: String,
    required: false
  },
  timeSpent: {
    type: String,
    required: false
  },
  season: {
    type: String,
    required: false
  },
  rating: {
    type: String, 
    required: false,
    enum:['⭐', '⭐⭐','⭐⭐⭐','⭐⭐⭐⭐','⭐⭐⭐⭐⭐']
  },
  detailedRating: {
    type: String,
    required: false
  }
});



const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  continent: {
    type: String
  },
  city: [citySchema],
  traveller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
},
{timestamps: true}
);



// models/hoot.js

  
const Country = mongoose.model('Country', countrySchema)

// models/hoot.js

module.exports = Country;
