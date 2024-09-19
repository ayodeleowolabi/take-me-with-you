import { Link } from "react-router-dom";
import styles from "../App/App.module.css";

export default function YourCountriesPage({ countries, user }) {
  // Trigger getUserCountries when user is available
  if (!countries.length) return null;
  let yourCountries = countries.filter(
    (country) => country.traveller._id === user._id
  );

  return (
    <>
    {yourCountries.length ? <h1>your countries</h1> : <h1>log your first country</h1>}
      <ul>
        {yourCountries && yourCountries.length > 0 ? (
          yourCountries.map((country) => (
            <li key={country._id} className={styles.card}>
              <Link to={`/country/${country._id}`}>
                <h2>{country.name}</h2>
                <h2>{country.traveller.name}</h2>
                <p> continent of {country.continent}</p>
              </Link>
            </li>
          ))
        ) : (
          <>
            <a href={`/country/new`}>
  <button>Add New Country</button>
</a>

          </>
        )}
      </ul>
    </>
  );
}
