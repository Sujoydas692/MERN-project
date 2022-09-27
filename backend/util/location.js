const axios = require('axios');
const HttpError = require('../models/http-error');

// const API_KEY = 'AIzaSyC_oEHF8_ITvHwdnzokLjjzzpMkFIEODDs';

async function getCroodsForAddress(address){
   return {
    lat: 40.7484474,
    lng: -73.9871516
  };
   // const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=API_KEY`);

   // const data = response.data;

   // if(!data || data.status === 'ZERO_REULTS'){
   //  const error = new HttpError('Could not find location!', 422);
   //  throw error;
   // }

   // const coordinates = data.results[0].geometry.location;

   // return coordinates;
}

module.exports = getCroodsForAddress;