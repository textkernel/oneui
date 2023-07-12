import {
    initGoogleMapServices,
    getRadiusInMeters,
    convertCoordinatesIntoAddress,
    findGeoCenterForPlaceId,
} from '../utils';
import { google, geocodeMock, stabGoogleApi } from '../../../__mocks__/googleApiMock';
import LatLngLiteral = google.maps.LatLngLiteral;

const coordinates = { lat: '4.32', lng: '54.1' } as LatLngLiteral;
const apiKey = { apiKey: 'google API key' };
const radius = 12;

const mockGoogleAPILoader = jest.fn().mockImplementation(() => {
    stabGoogleApi();
    return Promise.resolve();
});
jest.mock('@googlemaps/js-api-loader', () => ({
    Loader() {
        // @ts-ignore
        this.load = mockGoogleAPILoader;
    },
}));

describe('LocationSelector utils', () => {
    beforeEach(() => {
        stabGoogleApi();
        mockGoogleAPILoader.mockClear();
    });

    describe('#initGoogleMapServices()', () => {
        it("should init google maps if it doesn't exist", async () => {
            // @ts-ignore
            delete global.google;

            expect(global.google).toBeUndefined();

            await initGoogleMapServices(apiKey);

            expect(mockGoogleAPILoader).toBeCalledTimes(1);
            expect(global.google.maps).toBe(google.maps);
        });

        it('should not run Loader if google maps already exist', async () => {
            await initGoogleMapServices(apiKey);

            expect(mockGoogleAPILoader).toBeCalledTimes(0);
        });

        it('should run Loader only once', async () => {
            // @ts-ignore
            delete global.google;
            await initGoogleMapServices(apiKey);
            await initGoogleMapServices(apiKey);

            expect(mockGoogleAPILoader).toBeCalledTimes(1);
        });
    });

    describe('#getRadiusInMeters()', () => {
        it('should convert correctly from km to meters', () => {
            expect(getRadiusInMeters(radius, 'km')).toEqual(12000);
        });

        it('should convert correctly from miles to meters', () => {
            expect(getRadiusInMeters(radius, 'mi')).toEqual(19312.079999999998);
        });
    });

    describe('findGeoCenterForPlaceId that gets details of a place from google geocoder based on placeId and returns its coordinates', () => {
        it('should throw error if response status is not OK', async () => {
            geocodeMock.mockImplementationOnce((req, cb) => {
                cb([], 'WRONG');
            });

            await expect(findGeoCenterForPlaceId('someId')).rejects.toThrow(
                'Geocoder failed due to: WRONG'
            );
        });

        it('should throw error if no results were returned', async () => {
            geocodeMock.mockImplementationOnce((req, cb) => {
                cb([], 'OK');
            });

            await expect(findGeoCenterForPlaceId('someId')).rejects.toThrow(
                'No results found when searching for placeId someId'
            );
        });

        it('should return the location from the first result', async () => {
            geocodeMock.mockImplementationOnce((req, cb) => {
                cb([{ geometry: { location: 'some location' } }], 'OK');
            });

            await expect(findGeoCenterForPlaceId('someId')).resolves.toEqual('some location');
        });
    });

    describe('convertCoordinatesIntoAddress that gets and returns address details from google geocoder based on location', () => {
        it('should throw error if response status is not OK', async () => {
            geocodeMock.mockImplementationOnce((req, cb) => {
                cb([], 'WRONG');
            });

            await expect(convertCoordinatesIntoAddress(coordinates)).rejects.toThrow(
                'Geocoder failed due to: WRONG'
            );
        });

        it('should throw error if no results were returned', async () => {
            geocodeMock.mockImplementationOnce((req, cb) => {
                cb([], 'OK');
            });

            await expect(convertCoordinatesIntoAddress(coordinates)).rejects.toThrow(
                'No results found when searching for coordinates 4.32, 54.1'
            );
        });

        it('should return the location from the first result', async () => {
            geocodeMock.mockImplementationOnce((req, cb) => {
                cb([{ address_components: [] }], 'OK');
            });

            await expect(convertCoordinatesIntoAddress(coordinates)).resolves.toEqual({
                address_components: [],
            });
        });
    });
});
