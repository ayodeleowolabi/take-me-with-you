// controllers/hoots.js

const express = require("express");
const Country = require("../models/country.js");

module.exports = {
  create,
  index,
  show,
  update,
  deleteCountry,
  createCity,
  indexCity,
  showCity,
  updateCity,
  deleteCity
};

async function create(req, res) {
  try {
    req.body.traveller = req.user._id;
    const country = await Country.create(req.body);
    country._doc.traveller = req.user;
    res.status(201).json(country);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function index(req, res) {
  try {
    const countries = await Country.find({})
      .populate("traveller")
      .sort({ createdAt: "desc" });
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function show(req, res) {
  try {
    const oneCountry = await Country.findById(req.params.countryId).populate(
      "traveller"
    );
    res.status(200).json(oneCountry);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function update(req, res) {
  try {
    // Find the hoot:
    const country = await Country.findById(req.params.countryId);

    // Check permissions:
    if (!country.traveller.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    // Update hoot:
    const updatedCountry = await Country.findByIdAndUpdate(
      req.params.countryId,
      req.body,
      { new: true }
    );

    // Append req.user to the author property:
    updatedCountry._doc.traveller = req.user;

    // Issue JSON response:
    res.status(200).json(updatedCountry);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deleteCountry(req, res) {
  // controllers/hoots.js

  try {
    const country = await Country.findById(req.params.countryId);

    if (!country.traveller.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deletedCountry = await Country.findByIdAndDelete(
      req.params.countryId
    );
    res.status(200).json(deletedCountry);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function createCity(req, res) {
  try {
    req.body.traveller = req.user._id;
    const country = await Country.findById(req.params.countryId);
    country.city.push(req.body);
    country.save();

    const newCity = country.city[country.city.length - 1];
    newCity._doc.traveller = req.user;
    res.status(201).json(newCity);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function indexCity(req, res) {
  try {
    const country = await Country.findById(req.params.countryId);
    const cityArray = country.city;
    console.log(cityArray);
    console.log(country);

    res.status(201).json(cityArray);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function showCity(req, res) {
  try {
    const oneCity = await Country.findById(req.params.cityId).populate(
      "traveller"
    );
    res.status(201).json(oneCity);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function updateCity(req, res) {
  try {
    const country = await Country.findById(req.params.countryId);
    if (!country) return res.status(404).json({ message: 'Country not found' });

    const city = country.city.id(req.params.cityId);
    if (!city) return res.status(404).json({ message: 'City not found' });

    Object.assign(city, req.body);  // Update city fields with req.body data
    
    await country.save();  // Save the parent document

    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



async function deleteCity(req, res) {
  try {
    const country = await Country.findById(req.params.countryId);
    if (!country) return res.status(404).json({ message: 'Country not found' });

    const city = country.city.id(req.params.cityId);
    if (!city) return res.status(404).json({ message: 'City not found' });

    country.city.remove({_id: req.params.cityId})
    
    await country.save();  // Save the parent document

    res.status(200).json({message: 'City Removed!'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

