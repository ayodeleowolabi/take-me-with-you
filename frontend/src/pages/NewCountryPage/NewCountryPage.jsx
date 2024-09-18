// src/components/HootForm/HootForm.jsx

import { useState } from 'react';
import styles from '../App/Form.module.css'

const NewCountryPageForm = ({handleSubmitCountry}) => {
  const [formData, setFormData] = useState({
    name: '',
    continent: '',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    console.log(evt)
    console.log(evt.target)
    console.log(evt.target.value)
  };



  return (
    <main className={styles.form}>
      <form onSubmit={ (evt) => handleSubmitCountry(evt, formData)}>
        <label htmlFor="name-input">Country Name</label>
        <input
          required
          type="text"
          name="name"
          id="name-input"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="continent-input">Continent Name</label>
        <input
          type="text"
          name="continent"
          id="continent-input"
          value={formData.continent}
          onChange={handleChange}
    
        />
        <button onClick={(evt) => {console.log(evt.type)}} type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default NewCountryPageForm
