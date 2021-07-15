const request = require('request')

const forecast = (latitude,longitude, callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=0b638594e8783e0ade433e85f4dc0c06&query='+latitude+','+longitude+'&units=m'
    request({url, json: true}, (e, {body})=>{
    if (e){
        callback('unable to connect to weather service',undefined)
    } else if(body.error){
    callback('unable to find location',undefined)

    }
    else{
    callback( undefined, body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature + ' degrees but it feels like '+ body.current.feelslike+ ' degrees.')
    }})
}

module.exports =forecast