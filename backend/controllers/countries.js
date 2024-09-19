// controllers/hoots.js

const express = require("express");
const Country = require("../models/country.js");

module.exports = {
  create,
  index,
  indexYourCountries,
  show,
  update,
  deleteCountry,
  createCity,
  indexCity,
  showCity,
  updateCity,
  deleteCity,
};

async function create(req, res) {
  try {
    req.body.traveller = req.user._id;
    const country = await Country.create(req.body);
    await country.populate("traveller");

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

async function indexYourCountries(req, res) {
  console.log("getting your countries:", req.body);
  console.log("getting your countries:", req.user);

  try {
    req.body.traveller = req.user._id;
    const userId = req.body.traveller;
    const countries = await Country.find({ traveller: userId })
      .populate("traveller")
      .sort({ createdAt: "desc" });
    console.log(userId);
    console.log(countries);
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
  console.log(req.body);
  try {
    const country = await Country.findById(req.params.countryId).populate(
      "traveller"
    );
    country.city.push(req.body);
    await country.save();

    res.status(201).json(country);
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
  console.log("it runs");
  try {
    const country = await Country.findById(req.params.countryId);
    const oneCity = country.city.id(req.params.cityId);
    console.log(oneCity);
    res.status(201).json(oneCity);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function updateCity(req, res) {
  try {
    const country = await Country.findById(req.params.countryId).populate('traveller');
    if (!country) return res.status(404).json({ message: "Country not found" });

    const city = country.city.id(req.params.cityId);
    if (!city) return res.status(404).json({ message: "City not found" });

    Object.assign(city, req.body); // Update city fields with req.body data

    await country.save(); // Save the parent document

    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteCity(req, res) {
  try {
    const country = await Country.findById(req.params.countryId).populate('traveller');
    if (!country) return res.status(404).json({ message: "Country not found" });

    const city = country.city.id(req.params.cityId);
    if (!city) return res.status(404).json({ message: "City not found" });

    // country.city.pull({ _id: req.params.cityId });
    city.deleteOne()

    await country.save(); // Save the parent document

    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
