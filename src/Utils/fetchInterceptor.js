export const restApiUrls = {
CitiesURL :'http://opentable.herokuapp.com/api/cities',
RestaurantURL :'http://opentable.herokuapp.com/api/restaurants?city=#{CITY}#&per_page=100',
}
const axios = require('axios');

export const RequestAPI = (fetchObj, typeOfRequest) => {
 let url = '';
 let method = '';
 let headerObj = {};
 let bodyObj = {};

url = fetchObj.url;
 return axios.get(url)
 .then(function (response) {
  return  { 'type': 'success', 'data': response } 
 })
 .catch(function (error) {

  return  { 'type': 'failed', 'data': error }   // console.log(error);
 })
 .finally(function () {
   // always executed
 });
}