import sendRequest from "./sendRequest";

const BASE_URL = "/api/countries";

export async function createCountry(countryData) {
  const country = await sendRequest(`${BASE_URL}/`, "POST", countryData);
  return country;
}

export async function fetchCountries() {
  const countries = await sendRequest(`${BASE_URL}/`, "GET");
  return countries;
}

export async function fetchCountriesByUser(userId){
  const countries = await sendRequest(`${BASE_URL}/yourcountries?userId=${userId}`, "GET");
  return countries
}

export async function fetchCountryById(countryId) {
  const country = await sendRequest(`${BASE_URL}/${countryId}`, "GET");
  return country;
}

export async function updateCountry(countryId, updatedCountry) {
  const country = await sendRequest(
    `${BASE_URL}/${countryId}`,
    "PUT",
    updatedCountry
  );
  return country;
}

export async function deleteCountry(countryId) {
  const country = await sendRequest(`${BASE_URL}/${countryId}`, "DELETE");
  return country;
}

//CITIES

export async function createCity(countryId, cityData) {
  const city = await sendRequest(
    `${BASE_URL}/${countryId}/city`,
    "POST",
    cityData
  );
  return city;
};

export async function fetchCities(countryId){
    const cities = await sendRequest(`${BASE_URL}/${countryId}/city`, 'GET')
    return cities
};


export async function fetchCityById(cityId, countryId){
    const oneCity = await sendRequest(`${BASE_URL}/${countryId}/city/${cityId}`, 'GET')
    return oneCity
};

export async function updateCity(cityId, countryId, updatedCityData){
    const updatedCity = await sendRequest(
        `${BASE_URL}/${countryId}/city/${cityId}`,
        "PUT",
        updatedCityData
      );
    
    return updatedCity;
};


export async function deleteCity(countryId, cityId){
    const deletedCity = await sendRequest(
        `${BASE_URL}/${countryId}/city/${cityId}`,
        "DELETE"
      );
    
    return deletedCity;
};


