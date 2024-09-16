import { useParams, Link } from "react-router-dom";


export default function CountryDetailsPage({ countries }){
    const { countryId } = useParams();
    const country = countries.find((country) => country._id === countryId)
    const city = country ? country.city: null
    console.log(city)


    if(!country) return null;
    return (
        <>
        <ul>
            {city.length &&
              city.map((city) => (
                <li key={city._id}>
                  <Link to={`/country/${country._id}/city/${city._id}`}>
                    <h2>{city.name}</h2>
                  </Link>
                </li>
              ))}
          </ul>
        
        
        
        </>


    )


}