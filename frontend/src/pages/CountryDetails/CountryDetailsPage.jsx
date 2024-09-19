import { useParams, Link } from "react-router-dom";
import styles from "../App/App.module.css";

export default function CountryDetailsPage({
  countries,
  user,
  handleDeleteCountry,
}) {
  const { countryId } = useParams();
  const country = countries.find((country) => country._id === countryId);
  if (!country) return null;
  const city = country.city;

  return (
    <>
      {city.length === 0 ? (
        <>
          <p>{country.traveller.name || 'You'} has logged no cities in</p>
          <h1>{country.name}</h1>
        </>
      ) : (
        <>
          <ul>
            {city.length &&
              city.map((city) => (
                <li key={city._id} className={styles.card}>
                  <Link to={`/country/${country._id}/city/${city._id}`}>
                    <h2>{city.name}</h2>
                    <p>{city.timeSpent}</p>
                  </Link>
                  {country.traveller._id === user._id}
                </li>
              ))}
          </ul>
        </>
      )}
      {user._id === country.traveller._id && (
        <>
          <a href={`/country/${countryId}/newcity`}>
            <button>Add a New City</button>
          </a>
          <button onClick={() => handleDeleteCountry(countryId, city._id)}>
            Delete {country.name}
          </button>
        </>
      )}
    </>
  );
}
