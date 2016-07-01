/**
 * Your forecast.io key is available as the global variable:

process.env.FORECAST_KEY

 *
 */

/**
 * We include this line to ensure `fetch()` is ready to use in node
 */
require('isomorphic-fetch');


// Your code here...

// process.env.FORECAST_KEY
// fetch('https://api.forecast.io/forecast/e6674f61c08ff2ca8d4890dc7919f4a6/-33.8678500,151.2073200').then((response) => {


// 2 - Use the forecast.io API to get the current weather in your area

function weather(lat, long) {

  fetch('https://api.forecast.io/forecast/' + process.env.FORECAST_KEY + '/' + lat + ',' + long + '?units=si').then((response) => {
    return response.json()
  }).then((dataAsJson) => {
    // console.log(dataAsJson);
    console.log('At ' + dataAsJson.timezone + '\n' + 'The weather is ' + dataAsJson.hourly.summary + '\n' + 'Current temp is ' + dataAsJson.currently.temperature + ' degrees celcius');
  }).catch(function(err) {
    console.log('Error Forecast ', err);
  });

};



// 1 - Use Google Maps to get Lat and Long
  // Need to add error cacth


fetch('http://maps.googleapis.com/maps/api/geocode/json?address=Redfern').then((response) => {
  return response.json()
}).then((dataAsJson) => {

  // Store lat and long as variables - Look for the right object
  var lat = dataAsJson.results[0].geometry.location.lat
      long = dataAsJson.results[0].geometry.location.lng

  // Once we have the lat long co-ords call the weather function
  weather(lat, long);

}).catch(function(err) {
  console.log('Error GooleAPI ', err );
});
