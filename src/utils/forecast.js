const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/cd00f61360e7c5d774a2e3ae02b12d0c/${latitude},${longitude}?units=si`
    
    request({ url, json: true }, (error, {body}) => {
        
        if (error) {  // like low level os error, like network conn failure
        callback('Error while calling weather service.', undefined)
        } else if (body.error) {
        callback('Unable to retrieve temperature info based on input paramaters provided. Try other search.', undefined)
        } else {
        callback(undefined, `${body.daily.data[0].summary} Temerature is ${body.currently.temperature} degrees. and chances of rain is ${body.currently.precipProbability}%. Minimum temperature is ${body.daily.data[0].temperatureMin} and Maximum temperature is ${body.daily.data[0].temperatureMax}`)  
     }
    })
}


module.exports = forecast

