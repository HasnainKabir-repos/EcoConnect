import React from "react";
//import { useState } from "react";
import axios from "axios";
import AsyncSelect from 'react-select/async';
const LocationDropdown = ({ onChangePlace }) => {


  const processResponse = (response) => {
    const data = response.data.predictions.map((place) => ({
      label: place.description,
      value: place.place_id,
    }));

    return data;
  }


  const loadOptions = async (inputValue, callback) => {

    if (inputValue !== "") {
      try {

        const response = await axios.post('https://ecoconnect-3hx9.onrender.com/api/location/search', {
          input: inputValue
        })
        console.log(response.data);
        const options = processResponse(response.data);
        callback(options);
      } catch (error) {
        console.error(error);
      }
    }

  };
  const customStyles = {
    menu: (base) => ({
      ...base,
      position: 'relative'
    }),
  };

  const handleChange = async (selectedOption) => {
    //console.log(selectedOption);
    if (selectedOption !== null) {

      try {
        const response = await axios.post('https://ecoconnect-3hx9.onrender.com/api/location/details', {
          place_id: selectedOption.value,
          location: selectedOption.label
        });
        console.log(response.data);
        onChangePlace(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <AsyncSelect
      isClearable
      isSearchable
      loadOptions={loadOptions}
      onChange={(selectedOption) => {

        handleChange(selectedOption);
      }}
      styles={customStyles}
    />
  );
};

export default LocationDropdown;
