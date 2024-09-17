import { useParams, Link } from "react-router-dom";

export default function CountryDetailsPage({
  countries,
  user,
  handleDeleteCountry,
}) {

  const { countryId } = useParams();
  const country = countries.find((country) => country._id === countryId);
  const city = country ? country.city : 0;
  console.log(city);

  return (
    <>
      {city.length === 0 ? (
      <>
        <p>You have visited no cities in {country.name}</p>
        </>
       
      ) : (
        <>
          <ul>
            {city.length &&
              city.map((city) => (
                <li key={city._id}>
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
        <button onClick={() => handleDeleteCountry(countryId, city._id)}>
          Delete Country
        </button>
        <Link to={`/country/${country._id}/newcity`}>Add a city to {country.name} </Link>
        </>
      )}
    </>
  );
}
