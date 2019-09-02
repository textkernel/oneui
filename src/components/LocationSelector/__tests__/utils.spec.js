import { getRadiusInMeters, findCenter } from '../utils';
import { google, geocodeMock } from '../../../__mocks__/googleApiMock';

describe('getRadiusInMeters', () => {
    it('should convert correctly from km to meters', () => {
        expect(getRadiusInMeters(12, 'km')).toEqual(12000);
    });
    it('should convert correctly from miles to meters', () => {
        expect(getRadiusInMeters(12, 'mi')).toEqual(1621.34);
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
    it('should throw error if if no results were returned', async () => {
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
