"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forecast = void 0;
const request_1 = __importDefault(require("request"));
const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=0b638594e8783e0ade433e85f4dc0c06&query=" +
        latitude +
        "," +
        longitude +
        "&units=m";
    request_1.default({ url, json: true }, (e, { body }) => {
        if (e) {
            callback("unable to connect to weather service", undefined);
        }
        else if (body.error) {
            callback("unable to find location", undefined);
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] +
                ". It is currently " +
                body.current.temperature +
                " degrees but it feels like " +
                body.current.feelslike +
                " degrees.");
        }
    });
};
exports.forecast = forecast;
//# sourceMappingURL=forecast.js.map