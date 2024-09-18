import { Link } from "react-router-dom";

import styles from '../App/App.module.css'
export default function HomePage({ countries, user }) {

if (!countries) return null
  return (
    <>
      {user ? (
        <>
          <h1>Our Countries </h1>
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
        <h1>Login!</h1>
      )}
    </>
  );
}
