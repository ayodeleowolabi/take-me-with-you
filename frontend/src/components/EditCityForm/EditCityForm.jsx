import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditCityFormPage = ({ handleSubmitUpdatedCity, countries }) => {
  const [formData, setFormData] = useState(null);
  const { cityId, countryId } = useParams();

  const country = countries.find((country) => country._id === countryId);
  const city = country && country.city.find((city) => city._id === cityId);

  useEffect(() => {
    if (city) setFormData({ ...city });
  }, [city]);

  if (!city || !formData) return null;

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    console.log(evt);
    console.log(evt.target);
    console.log(evt.target.value);
  };

  return (
    <>
      <br></br>

      <h1>Edit your {country.name} log</h1>
      <br></br>
      <main id="formlinebreaks">
        <form
          onSubmit={(evt) =>
            handleSubmitUpdatedCity(evt, cityId, countryId, formData)
          }
        >
          <label htmlFor="name-input">City Name</label>
          <input
            required
            type="text"
            name="name"
            id="name-input"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="historicalSites-input">Historical Sites</label>
          <textarea
            type="text"
            name="historicalSites"
            id="historicalSites-input"
            value={formData.historicalSites}
            onChange={handleChange}
          />
          <label htmlFor="entertainment-input">Entertainment</label>
          <textarea
            type="text"
            name="entertainment"
            id="entertainment-input"
            value={formData.entertainment}
            onChange={handleChange}
          />
          <label htmlFor="food-input">Food</label>
          <textarea
            type="text"
            name="food"
            id="food-input"
            value={formData.food}
            onChange={handleChange}
          />
          <label htmlFor="timespent-input">Time Spent</label>
          <input
            type="text"
            name="timeSpent"
            id="food-input"
            value={formData.timeSpent}
            onChange={handleChange}
          />
          <label htmlFor="season-input">Season</label>
          <input
            type="text"
            name="season"
            id="season-input"
            value={formData.season}
            onChange={handleChange}
          />

          <label htmlFor="detailedRating-input">Details</label>
          <select value={formData.rating} name="rating" onChange={handleChange}>
            <option value="⭐">⭐</option>
            <option value="⭐⭐">⭐⭐</option>
            <option value="⭐⭐⭐">⭐⭐⭐</option>
            <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
            <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
          </select>
          <label htmlFor="detailedRating-input">
            Details: Tell us more about your highlights or dissapointments!
          </label>
          <textarea
            type="text"
            name="detailedRating"
            id="detailedRating-input"
            value={formData.detailedRating}
            onChange={handleChange}
          />
          <button
            onClick={(evt) => {
              console.log(evt.type);
            }}
            type="submit"
          >
            SUBMIT
          </button>
        </form>
      </main>
    </>
  );
};

export default EditCityFormPage;
