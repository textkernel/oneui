import { getRadiusInMeters, getAddressComponents, findCenter } from '../utils';
import { google, geocodeMock } from '../../../__mocks__/googleApiMock';

describe('getRadiusInMeters', () => {
    it('should convert correctly from km to meters', () => {
        expect(getRadiusInMeters(12, 'km')).toEqual(12000);
    });
    it('should convert correctly from miles to meters', () => {
        expect(getRadiusInMeters(12, 'mi')).toEqual(19312.079999999998);
    });
});

describe('findCenter that gets details of a place from google geocoder based on placeId and returns its coordinates', () => {
    const geocoder = new google.maps.Geocoder();
    it('should throw error if response status is not OK', async () => {
        geocodeMock.mockImplementationOnce((req, cb) => {
            cb([], 'WRONG');
        });
        await expect(findCenter(geocoder, 'someId')).rejects.toThrow(
            'Geocoder failed due to: WRONG'
        );
    });
    it('should throw error if no results were returned', async () => {
        geocodeMock.mockImplementationOnce((req, cb) => {
            cb([], 'OK');
        });
        await expect(findCenter(geocoder, 'someId')).rejects.toThrow(
            'No results found when searching for placeId someId'
        );
    });
    it('should return the location from the first result', async () => {
        geocodeMock.mockImplementationOnce((req, cb) => {
            cb([{ geometry: { location: 'some location' } }], 'OK');
        });
        await expect(findCenter(geocoder, 'someId')).resolves.toEqual('some location');
    });
});

describe('getAddressComponents that gets and returns address details from google geocoder based on location', () => {
    const geocoder = new google.maps.Geocoder();
    it('should throw error if response status is not OK', async () => {
        geocodeMock.mockImplementationOnce((req, cb) => {
            cb([], 'WRONG');
        });
        await expect(getAddressComponents(geocoder, { lat: '4.32', lng: '54.1' })).rejects.toThrow(
            'Geocoder failed due to: WRONG'
        );
    });
    it('should throw error if no results were returned', async () => {
        geocodeMock.mockImplementationOnce((req, cb) => {
            cb([], 'OK');
        });
        await expect(getAddressComponents(geocoder, { lat: '4.32', lng: '54.1' })).rejects.toThrow(
            'No results found when searching for coordinates 4.32, 54.1'
        );
    });
    it('should return the location from the first result', async () => {
        geocodeMock.mockImplementationOnce((req, cb) => {
            cb([{ address_components: [] }], 'OK');
        });
        await expect(getAddressComponents(geocoder, { lat: '4.32', lng: '54.1' })).resolves.toEqual(
            []
        );
    });
});
