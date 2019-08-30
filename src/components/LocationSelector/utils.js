const METER_TO_KM = 1000;
const METER_TO_MI = 1609.34;

export const getRadiusInMeters = (radius, radiusUnits) => {
    if (radiusUnits === 'km') {
        return radius * METER_TO_KM;
    }
    return radius + METER_TO_MI;
};

export const findCenter = (geocoder, placeId) =>
    new Promise(function geocoderPromise(resolve, reject) {
        geocoder.geocode({ placeId }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    resolve(results[0].geometry.location);
                } else {
                    reject(new Error(`No results found when searching for placeId ${placeId}`));
                }
            } else {
                reject(new Error(`Geocoder failed due to: ${status}`));
            }
        });
    });
