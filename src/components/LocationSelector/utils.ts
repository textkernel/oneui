const METER_TO_KM = 1000;
const METER_TO_MI = 1609.34;

type Geocoder = google.maps.Geocoder;
type LatLngLiteral = google.maps.LatLngLiteral;
type LatLng = google.maps.LatLng;

export type LocationSelectorAddressComponent = google.maps.GeocoderAddressComponent;

export type LocationSelectorLocation = {
    id: string;
    place_id: string;
    center: {
        lng: number;
        lat: number;
    };
    radius: number;
    description: string;
    addressComponents?: LocationSelectorAddressComponent[];
};

export const getRadiusInMeters = (radius: number, radiusUnits: string) => {
    if (radiusUnits === 'km') {
        return radius * METER_TO_KM;
    }
    return radius * METER_TO_MI;
};

export const findCenter = (geocoder: Geocoder, placeId: string) =>
    new Promise<LatLng>((resolve, reject) => {
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

export const getAddressComponents = (geocoder: Geocoder, location: LatLngLiteral) =>
    new Promise<LocationSelectorAddressComponent[]>((resolve, reject) => {
        geocoder.geocode({ location }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    resolve(results[0].address_components);
                } else {
                    reject(
                        new Error(
                            `No results found when searching for coordinates ${location.lat}, ${location.lng}`
                        )
                    );
                }
            } else {
                reject(new Error(`Geocoder failed due to: ${status}`));
            }
        });
    });
