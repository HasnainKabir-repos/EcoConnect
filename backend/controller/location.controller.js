const axios = require('axios');

const apiKey = 'AIzaSyCpaTDFISed1EluZ_CIUsT44Lre77kYjs0';
const apiUrl_autocomplete = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
const apiUrl_details = 'https://maps.googleapis.com/maps/api/place/details/json';
const autoCompleteLocation = async (req, res) => {

    try {
        const input = req.body.input;

        const response = await axios.get(
            apiUrl_autocomplete,
            {
                params: {
                    input: input,
                    location: '23.777176 90.399452',
                    radius: '500000',
                    key: apiKey,
                },
            }
        );

        //console.log(response.data);

        if (response.status === 200)
            res.status(200).json({ data: response.data });
        else
            res.status(500).json({
                message: "Data cannot be fetched",
                error: response.error
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }

};

const placeDetails = async (req, res) => {

    try {
        const place_id = req.body.place_id;

        const response = await axios.get(
            apiUrl_details,
            {
                params: {
                    place_id: place_id,
                    key: apiKey,
                },
            }
        );

        //console.log(response.data);

        if (response.status === 200){
            const {lat, lng} = extractLongLat(response.data);
            res.status(200).json({
                lat: lat,
                lng: lng
            })
        }
            
        else{
            res.status(500).json({
                message: "Place details cannot be fetched",
                error: response.error
            });
        }
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }

};


const extractLongLat = (data) => {
    const {lat, lng} = data.result.geometry.location;
    return {lat, lng}; 
};

module.exports = {autoCompleteLocation, placeDetails};