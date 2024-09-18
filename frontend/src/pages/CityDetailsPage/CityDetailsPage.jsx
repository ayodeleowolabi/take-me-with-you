import { useParams, Link } from "react-router-dom";
import styles from "../App/App.module.css";

export default function CityDetailsPage({ user, countries, handleDeleteCity }) {
  const { countryId } = useParams();
  const country = countries.find((country) => country._id === countryId);
  const { cityId } = useParams();
  if (!country) return null;
  const city = country.city.find((city) => city._id === cityId);
  console.log(city);
  console.log(country);

  return (
    <>
      {!country ? <h1>Something</h1> : null}
      <>
        <div className={styles.card}>
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
        </div>
      </>
      {user._id === country.traveller._id && (
        <>
          <Link to={`/country/${countryId}/city/${cityId}/edit`}>
            Edit {city.name}
          </Link>
          <button onClick={() => handleDeleteCity(countryId)}>
            Delete City
          </button>
        </>
      )}
    </>
  );
}
