const request = require('request')

const geoCode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZHZhc2FuaSIsImEiOiJjanRrenZxNXUwZ2E0NDVxM3gwbXFqOXAwIn0.coa0L9En4TN_Jf9nn776jw&limits=1`
 
    request({url, json: true}, (error, {body}) => {
       if (error) {
          callback('Error:- while calling location service.', undefined)
       } else if (body.features.length === 0) {
          callback('Not able to retrieve location data. Try another search.', undefined)
       } else {
          callback(undefined, {
             latitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             place: body.features[0].place_name
          })
       }
    })
 }
 
 
 module.exports = geoCode