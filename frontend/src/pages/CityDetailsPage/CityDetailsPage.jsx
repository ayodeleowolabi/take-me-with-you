import { useParams } from "react-router-dom";

export default function CityDetailsPage({ countries }) {
  const { countryId } = useParams();
  const country = countries.find((country) => country._id === countryId);
  const { cityId } = useParams();
  const city= country.city.find((city) => city._id === cityId);
  console.log(city);
  console.log(country);

  return (
    <>
    {!country ? <h1>Something</h1> :null}
        <>
          <h2>{city.name}</h2>
          <ul>
            {city.historicalSites || "No Historical Sites"}
            <br></br>
            {city.food || "No Food"}
            <br></br>
            {city.entertainment || "No Entertainment"}
            <br></br>
            {city.timeSpent || "No Time Logged"}
            <br></br>
            {city.season || "No Season"}
            <br></br>
            {city.rating}
            <br></br>
            {city.detailedRating || "No details"}
          </ul>
        </>

    </>
  );
}
