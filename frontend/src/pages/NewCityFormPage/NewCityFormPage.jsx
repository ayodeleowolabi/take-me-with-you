import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../App/Form.module.css'

const NewCityFormPage = ({ handleSubmitCity, countries}) => {
    const { countryId } = useParams()
  
    const country = countries.find((country) => country._id === countryId);
    console.log(country)
    
    
    
    const [formData, setFormData] = useState({
      name: '',
      historicalSites: '',
      entertainment: '',
      food: '',
      timeSpent:'',
      season: '',
      rating: "⭐",
      detailedRating: ''
    });
    
    
    const handleChange = (evt) => {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
      console.log(evt)
      console.log(evt.target)
      console.log(evt.target.value)
    };
    
    
    if (!country) return null;

  return (
    <main className={styles.form}>
      
      <h2>add a city to {country.name}</h2>
      <form onSubmit={ (evt) => handleSubmitCity(evt, countryId, formData)}>
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
        <select value={formData.rating} name='rating' onChange={handleChange}>
            <option value='⭐'>⭐</option>
            <option value='⭐⭐'>⭐⭐</option>
            <option value='⭐⭐⭐'>⭐⭐⭐</option>
            <option value='⭐⭐⭐⭐'>⭐⭐⭐⭐</option>
            <option value='⭐⭐⭐⭐⭐'>⭐⭐⭐⭐⭐</option>
        
           
        </select>
        <label htmlFor="detailedRating-input">Details: Tell us more about your highlights or dissapointments!</label>
        <textarea
          type="text"
          name="detailedRating"
          id="detailedRating-input"
          value={formData.detailedRating}
          onChange={handleChange}
    
        />
        <button onClick={(evt) => {console.log(evt.type)}} type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default NewCityFormPage