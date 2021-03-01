import { Loader, LoaderOptions } from '@googlemaps/js-api-loader';

const METER_TO_KM = 1000;
const METER_TO_MI = 1609.34;

export type LatLngLiteral = google.maps.LatLngLiteral;
export type LatLng = google.maps.LatLng;
export type GeocoderResult = google.maps.GeocoderResult;
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
export const GOOGLE_API_LIBRARIES = ['places'] as Array<'places'>;

export const initGoogleMapServices = (options: LoaderOptions): Promise<void> => {
    if (window?.google?.maps) {
        return Promise.resolve();
    }
    return new Loader({
        libraries: GOOGLE_API_LIBRARIES,
        ...options,
    }).load();
};

export const getRadiusInMeters = (radius: number, radiusUnits: string) => {
    if (radiusUnits === 'km') {
        return radius * METER_TO_KM;
    }
    return radius * METER_TO_MI;
};

export const findCenter = (placeId: string): Promise<LatLng> => {
    if (!window?.google?.maps) {
        return Promise.reject(new Error('Google maps is not initialized'));
    }
    const { Geocoder } = window.google.maps;
    const geocoder = new Geocoder();
    return new Promise<LatLng>((resolve, reject) => {
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
};

export const convertCoordinatesIntoAddress = (location: LatLngLiteral): Promise<GeocoderResult> => {
    if (!window?.google?.maps) {
        return Promise.reject(new Error('Google maps is not initialized'));
    }
    const { Geocoder } = window.google.maps;
    const geocoder = new Geocoder();
    return new Promise<GeocoderResult>((resolve, reject) => {
        geocoder.geocode({ location }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    resolve(results[0]);
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
};
