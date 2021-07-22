import request from "request";
interface GeocodeApiResponseBodyFeature {
  center: [latitude: number, longitude: number];
  place_name: string;
}
interface GeocodeApiResponseBody {
  error?: string;
  features: GeocodeApiResponseBodyFeature[];
}
interface GeocodeApiResponse {
  body: GeocodeApiResponseBody;
}

export const geocode = (
  address: string,
  callback: (
    error: string | undefined | null,
    body: {
      latitude?: number;
      longitude?: number;
      location?: string;
    }
  ) => void
) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaGFuc2NlbGVzdGluIiwiYSI6ImNrcjEwY2hpNzE2dnQydm83ZmNoOTR3bm4ifQ.RLsng86R5hLZNwRdtIMVbg&limit=1`;

  request({ url, json: true }, (e, { body }: GeocodeApiResponse) => {
    if (e) {
      callback("Unable to connect to location services!", {});
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search", {});
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};
