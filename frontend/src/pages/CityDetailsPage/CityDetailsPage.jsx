import { useParams, Link } from "react-router-dom";
import styles from "../App/App.module.css";

export default function CityDetailsPage({ user, countries, handleDeleteCity }) {
  const { countryId } = useParams();
  const country = countries.find((country) => country._id === countryId);
  const { cityId } = useParams();
  if (!country) return null;
  const city = country.city.find((city) => city._id === cityId);
  if (!city) return null;
  console.log(city);
  console.log(country);

  return (
    <>
      {!country ? <h1>Something</h1> : null}
      <>
        <div id="formlinebreaks" className={styles.card}>
            {country.traveller.name === user.name? <p> Your Travel log</p> : <p>{country.traveller.name}'s travel log</p>}
          <h1>{city.name}</h1>
          <h2>Historical Sites </h2>
          <ul>
            {city.historicalSites
              ? city.historicalSites.split("\n").map((site, index) => (
                  <li key={index}>
                    {site}
                    <br />
                  </li>
                ))
              : "Historical sites loading..."}

            <h2>food</h2>
            {city.food
              ? city.food.split("\n").map((site, index) => (
                  <li key={index}>
                    {site}
                    <br />
                  </li>
                ))
              : "Food info loading..."}
            <h2>Entertainment</h2>
            {city.entertainment
              ? city.entertainment.split("\n").map((site, index) => (
                  <li key={index}>
                    {site}
                    <br></br>
                  </li>
                ))
              : "Entertainment loading..."}
               <br></br>
               <br></br>

            <>Time Spent: {city.timeSpent || ""}</>
            <br></br>
            <> season: {city.season || ""}</>

            <br></br>
            <>Rating: </>{city.rating}
            <br></br>
            {city.detailedRating || ""}
          </ul>
          <br></br>
        </div>
      </>
      {user._id === country.traveller._id && (
        <>
          <Link to={`/country/${countryId}/city/${cityId}/edit`}>
            Edit {city.name}
          </Link>
          <button onClick={() => handleDeleteCity(countryId, cityId)}>
            Delete City
          </button>
        </>
      )}
    </>
  );
}
