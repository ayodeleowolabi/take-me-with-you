import { Link } from "react-router-dom";

export default function HomePage({ countries, user }) {
  return (
    <>
      {user ? (
        <>
          <h1>Countries</h1>

          <ul>
            {countries.length &&
              countries.map((country) => (
                <li key={country._id}>
                  <Link to={`/country/${country._id}`}>
                    <h2>{country.name}</h2>
                    <p>{country.continent}</p>
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
