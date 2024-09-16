import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { getUser } from "../../services/authService";
import { fetchCountries, createCountry, createCity } from "../../services/countryService";
import "./App.css";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from "../HomePage/HomePage";
import PostListPage from "../PostListPage/PostListPage";
import NewCountryPageForm from "../NewCountryPage/NewCountryPage";
import CountryDetailsPage from '../CountryDetails/CountryDetailsPage'
import CityDetailsPage from "../CityDetailsPage/CityDetailsPage";
import NewCityFormPage from "../NewCityFormPage/NewCityFormPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import LogInPage from "../LogInPage/LogInPage";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([])

  const getAllCountries = async () => {
    const countries = await fetchCountries();
    setCountries(countries);
  };
  const handleSubmitCountry = async (evt, formData) => {
    evt.preventDefault();
    const newCountry = await createCountry(formData);
    setCountries([...countries, newCountry]);
    navigate("/");
  };

  const handleSubmitCity = async (evt, countryId, formData) => {
    evt.preventDefault();
    
    const updatedCountry = await createCity(countryId, formData);
    const updatedCountries = countries.map((country) => country._id === countryId ? updatedCountry : country)
    setCountries(updatedCountries)
    navigate(`/country/${countryId}`)
  };
  

  useEffect(() => {
    getAllCountries();
  }, [user]);

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
              element={<CountryDetailsPage user={user} countries={countries} />}
            />
            <Route path="/country" element={<PostListPage />} />
            <Route
              path="/country/new"
              element={
                <NewCountryPageForm handleSubmitCountry={handleSubmitCountry} />
              }
            />
              <Route
                path="/country/:countryId/city/:cityId"
                element={<CityDetailsPage user={user} countries={countries} />}
              />
              <Route
                path="/country/:countryId/newcity"
                element={<NewCityFormPage user={user} countries={countries} handleSubmitCity={handleSubmitCity} />}
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
