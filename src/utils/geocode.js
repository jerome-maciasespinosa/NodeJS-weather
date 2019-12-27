const request = require('request');

const mapBoxBaseUrl = 'https://api.mapbox.com';
const mapBoxUrl = '/geocoding/v5/';
const mapBoxToken = 'pk.eyJ1IjoiamVyb21lMjEwMyIsImEiOiJjazRsYTF0YzkwMDZ1M2ttaHJ2ajM0MXhyIn0.CeED_dHJQO-CTwoR7BAvPw';

const geocode = (address, callback) => {
    const url = `${mapBoxBaseUrl}${mapBoxUrl}mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapBoxToken}&limit=1`;
    console.log('geocode url ', url);
    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback('unable to connect to geocode service', undefined);
        } else if (body.features.length === 0) {
            callback('no results', undefined);
        } else {
            callback(undefined, {
                location: body.features[0].place_name, 
                longitude: body.features[0].center[0], 
                latitude: body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode;