import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { getUser } from "../../services/authService";
import {
  fetchCountries,
  createCountry,
  createCity,
  deleteCountry,
  deleteCity,
  updateCity,
} from "../../services/countryService";
import "./App.css";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from "../HomePage/HomePage";
import NewCountryPageForm from "../NewCountryPage/NewCountryPage";
import EditCityFormPage from "../../components/EditCityForm/EditCityForm";
import CountryDetailsPage from "../CountryDetails/CountryDetailsPage";
import CityDetailsPage from "../CityDetailsPage/CityDetailsPage";
import NewCityFormPage from "../NewCityFormPage/NewCityFormPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import LogInPage from "../LogInPage/LogInPage";
import YourCountriesPage from "../YourCountriesPage/YourCountriesPage";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());
  const [countries, setCountries] = useState([]);

  const getAllCountries = async () => {
    const countries = await fetchCountries();
    setCountries(countries);
  };
  useEffect(() => {
    if (user) {
      getAllCountries();
    } else {
      setCountries([]);
    }
  }, [user]);

  const handleSubmitCountry = async (evt, formData) => {
    evt.preventDefault();
    const newCountry = await createCountry(formData);

    setCountries([...countries, newCountry]);
    navigate("/yourcountries");
  };

  const handleSubmitCity = async (evt, countryId, formData) => {
    evt.preventDefault();

    const updatedCountry = await createCity(countryId, formData);
    const updatedCountries = countries.map((country) =>
      country._id === countryId ? updatedCountry : country
    );
    setCountries(updatedCountries);
    navigate(`/country/${countryId}`);
  };
  const handleSubmitUpdatedCity = async (evt, cityId, countryId, formData) => {
    evt.preventDefault();

    const updatedCountry = await updateCity(cityId, countryId, formData);
    const updatedCountries = countries.map((country) =>
      country._id === countryId ? updatedCountry : country
    );
    setCountries(updatedCountries);
    navigate(`/country/${countryId}/city/${cityId}`);
  };

  const handleDeleteCountry = async (countryId) => {
    const deletedCountry = await deleteCountry(countryId);

    setCountries(
      countries.filter((country) => country._id !== deletedCountry._id)
    );
    navigate("/");
  };

  const handleDeleteCity = async (countryId, cityId) => {
    try {
      const updatedCountry = await deleteCity(countryId, cityId);
      console.log('updated Country:', updatedCountry)
      let updatedCountries = countries.map((country) => country._id === updatedCountry._id ? updatedCountry : country);
      setCountries(updatedCountries);
      navigate(`/country/${countryId}`);
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  return (
    <main id="react-app">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route
              path="/"
              element={<HomePage user={user} countries={countries} />}
            />
            <Route
              path="/country/:countryId"
              element={
                <CountryDetailsPage
                  handleDeleteCountry={handleDeleteCountry}
                  user={user}
                  countries={countries}
                />
              }
            />
            <Route
              path="/yourcountries"
              element={<YourCountriesPage user={user} countries={countries} />}
            />
            <Route
              path="/country/new"
              element={
                <NewCountryPageForm handleSubmitCountry={handleSubmitCountry} />
              }
            />
            <Route
              path="/country/:countryId/city/:cityId"
              element={
                <CityDetailsPage
                  user={user}
                  countries={countries}
                  handleDeleteCity={handleDeleteCity}
                />
              }
            />
            <Route
              path="/country/:countryId/city/:cityId/edit"
              element={
                <EditCityFormPage
                  countries={countries}
                  handleSubmitUpdatedCity={handleSubmitUpdatedCity}
                />
              }
            />
            <Route
              path="/country/:countryId/newcity"
              element={
                <NewCityFormPage
                  user={user}
                  countries={countries}
                  handleSubmitCity={handleSubmitCity}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </section>
    </main>
  );
}

export default App;
