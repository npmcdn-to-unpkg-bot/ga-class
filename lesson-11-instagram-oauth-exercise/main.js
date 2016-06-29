/**
 * Instagram OAuth Exercise
 * ====
 *
 * See the README.md for instructions
 */

 // https://api.instagram.com/v1/users/self/media/recent/?access_token=ACCESS-TOKEN
 // recent = instagramBasUrl + '/users/self/media/recent/?access_token=' + accessToken



(function() {

  var forecastBasUrl = 'https://crossorigin.me/https://api.forecast.io/forecast/'
      instagramBasUrl = 'https://crossorigin.me/https://api.instagram.com/v1/'
      container = document.querySelector('#container')
      state = {}

      url = window.location.hash
      fullToken = url.split('=');
      accessToken = fullToken[1];
      recent = instagramBasUrl + 'users/self/media/recent/?access_token=' + accessToken



  if (false /* TODO: did user authorize? */) {
    renderLogin(state, container)
  } else {

    // Fetch the Recent photo form Insta

    fetch(recent).then((response) => {
      return response.json()
    }).then((dataAsJson) => {
      image = dataAsJson.data[0].images.standard_resolution.url;
      coords = dataAsJson.data[0].location.latitude +',' + dataAsJson.data[0].location.longitude;
      weather()
      console.log(weatherData);
      renderImages(state, container)
    }).catch(function(err) {
      console.log('Recent Photos Error  ', err );

    function weather() {

      fetch(forecastBasUrl + 'e6674f61c08ff2ca8d4890dc7919f4a6/' + coords + '?units=si').then((response) => {
        return response.json()
      }).then((dataAsJson) => {
        weatherData = dataAsJson.hourly.summary;
      }).catch(function(err) {
        console.log('Error Forecast ', err);
      });

    }

  }

  function renderLogin(data, into) {
    // TODO: Add the template

  }

  function renderImages(data, into) {
    // find .instaweather images

        into.innerHTML = `
        // <p>Weather is  </p>
          <img src="${image}" />
        `
  }


})()
