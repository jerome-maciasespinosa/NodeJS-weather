const request = require('request');

const darkSkyBaseUrl ='https://api.darksky.net';
const darkSkyUrl ='/forecast';
const darkSkyKey = '/85f86935b67e1338fc4eb56b6932767e';

const weather = (longitude, latitude, callback) => {
    const url = `${darkSkyBaseUrl}${darkSkyUrl}${darkSkyKey}/${latitude},${longitude}?units=si&lang=fr`;
    console.log(url);
    request({url, json: true} , (err, {body}) => {
        if (err ) {
            callback('Unable to connect to darksky web service', undefined);
        } else if (body.error) {
            callback(`error : ${body.error}`, undefined)
        } else {
            const {temperature,precipProbability} = body.currently;
            callback(undefined, `${body.daily.data[0].summary} It is currrently ${temperature} degrees out. There is a ${precipProbability}% chance of rain`)
        }
    })
}

module.exports = weather;