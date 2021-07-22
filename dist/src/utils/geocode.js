"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geocode = void 0;
const request_1 = __importDefault(require("request"));
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGFuc2NlbGVzdGluIiwiYSI6ImNrcjEwY2hpNzE2dnQydm83ZmNoOTR3bm4ifQ.RLsng86R5hLZNwRdtIMVbg&limit=1`;
    request_1.default({ url, json: true }, (e, { body }) => {
        if (e) {
            callback("Unable to connect to location services!", {});
        }
        else if (body.features.length === 0) {
            callback("Unable to find location. Try another search", {});
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name,
            });
        }
    });
};
exports.geocode = geocode;
//# sourceMappingURL=geocode.js.map