const axios = require("axios");
const EcoEvent = require("../models/EcoEvent");
const apiKey = "AIzaSyCpaTDFISed1EluZ_CIUsT44Lre77kYjs0";
const apiUrl_autocomplete =
  "https://maps.googleapis.com/maps/api/place/autocomplete/json";
const apiUrl_details =
  "https://maps.googleapis.com/maps/api/place/details/json";
const autoCompleteLocation = async (req, res) => {
  try {
    const input = req.body.input;

    const response = await axios.get(apiUrl_autocomplete, {
      params: {
        input: input,
        location: "23.777176 90.399452",
        radius: "500000",
        key: apiKey,
      },
    });

    //console.log(response.data);

    if (response.status === 200) res.status(200).json({ data: response.data });
    else
      res.status(500).json({
        message: "Data cannot be fetched",
        error: response.error,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const placeDetails = async (req, res) => {
  try {
    const { place_id, location } = req.body;

    const response = await axios.get(apiUrl_details, {
      params: {
        place_id: place_id,
        key: apiKey,
      },
    });

    //console.log(response.data);

    if (response.status === 200) {
      const { lat, lng } = extractLongLat(response.data);
      res.status(200).json({
        lat: lat,
        lng: lng,
        location: location,
      });
    } else {
      res.status(500).json({
        message: "Place details cannot be fetched",
        error: response.error,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const extractLongLat = (data) => {
  const { lat, lng } = data.result.geometry.location;
  return { lat, lng };
};

const findNearbyEvents = async (req, res) => {
  try {
    // Haversine Distance

    const { email } = req.user;
    const { lat, lng } = req.body;

    const events = await EcoEvent.find({ organizer: { $ne: email } }).sort({
      date: -1,
    });
    const nearbyEvents = events.filter((event) => {
      const eventLat = event.lat;
      const eventLng = event.lng;

      const dLat = (eventLat - lat) * (Math.PI / 180);
      const dLon = (eventLng - lng) * (Math.PI / 180);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat * (Math.PI / 180)) *
          Math.cos(eventLat * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = 6371000 * c;

      return distance <= 10000;
    });

    res.status(200).json(nearbyEvents);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  autoCompleteLocation,
  placeDetails,
  extractLongLat,
  findNearbyEvents,
};
