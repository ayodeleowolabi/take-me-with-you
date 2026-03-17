import { Link } from "react-router-dom";
import styles from "../App/App.module.css";
import TravelMap from "../../components/TravelMap";

export default function HomePage({ countries, user }) {
  // Build cities array from all countries for the map
  const allCities = (countries || []).flatMap(country => country.city || []);

  return (
    <>
      {user ? (
        <>
          <h1>Our Adventures!</h1>

         <div style={{ width: '100%', padding: '0 2rem' }}>
  <TravelMap cities={allCities} />
</div>

          <ul>
            {countries.length &&
              countries.map((country) => (
                <li key={country._id} className={styles.card}>
                  <Link to={`/country/${country._id}`}>
                    <h2>{country.name}</h2>
                    <h2>{country.traveller.name}</h2>
                    <p>Continent of {country.continent}</p>
                  </Link>
                </li>
              ))}
          </ul>
        </>
      ) : (
        <>
          <h1 className={styles.card}>take me! ✈️</h1>
          <h3 className={styles.card}>Your new favorite travel app. 😁</h3>
          <a href="/signup">
            <button>Sign Up</button>
          </a>
          <a href="/login">
            <button>Log in</button>
          </a>
        </>
      )}
    </>
  );
}