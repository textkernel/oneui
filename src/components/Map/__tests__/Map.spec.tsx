import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
    fitBoundsMock,
    setZoomMock,
    setCenterMock,
    geocodeMock,
    addGeoJsonMock,
    removeDataMock,
    stabGoogleApi,
} from '../../../__mocks__/googleApiMock';
import { geocodeResponse } from '../__mocks__/geocodeResponse';
import { CircularMarker, Map, RegionArea } from '..';
import NL_PATHS_JSON from '../../../../stories/static/gadm36_NLD_0.json';
import FR_FRIESLAND_JSON from '../../../../stories/static/FR_Friesland.json';

const NL_PATHS = NL_PATHS_JSON as GeoJSON.FeatureCollection;
const FR_FRIESLAND = FR_FRIESLAND_JSON as GeoJSON.FeatureCollection;

stabGoogleApi();

describe('<Map/> that renders a Map with markers', () => {
    const regionMarker = {
        center: {
            lat: 52.3922288,
            lng: 4.9338793,
        },
        radius: 30000,
    } as CircularMarker;
    const pointMarker = {
        center: {
            lat: 52.5112671,
            lng: 7.2535521,
        },
    } as CircularMarker;

    it('should set center and zoom when rendered with default props', () => {
        render(<Map />);

        expect(setZoomMock).toHaveBeenCalledTimes(1);
        expect(setCenterMock).toHaveBeenCalledTimes(1);
    });

    it('should fit bounds when rendered with defaultArea as address', () => {
        geocodeMock.mockImplementationOnce((req, cb) => {
            cb(geocodeResponse.results, geocodeResponse.status);
        });
        render(<Map defaultArea={{ address: 'nl' }} />);

        expect(geocodeMock).toHaveBeenCalledTimes(1);
        expect(fitBoundsMock).toHaveBeenCalledTimes(1);
    });

    it('should add default highlight', () => {
        render(<Map defaultHighlight={NL_PATHS} />);

        expect(addGeoJsonMock).toHaveBeenCalledTimes(1);
    });

    it('should remove default highlight when markers added', () => {
        const view = render(<Map defaultHighlight={NL_PATHS} />);

        expect(addGeoJsonMock).toHaveBeenCalledTimes(1);

        view.rerender(<Map defaultHighlight={NL_PATHS} markers={[pointMarker, regionMarker]} />);
        // will be called as many times as the length of the returned array from addGeoJsonMock
        expect(removeDataMock).toHaveBeenCalledTimes(1);
    });

    it('should fit map to markers', () => {
        render(<Map markers={[pointMarker, regionMarker]} />);
        // call fitBounds for each marker
        expect(fitBoundsMock).toHaveBeenCalledTimes(1);
    });

    it('should fit map when new marker is added', () => {
        const view = render(<Map markers={[pointMarker]} />);

        expect(fitBoundsMock).toHaveBeenCalledTimes(1);

        view.rerender(<Map defaultHighlight={NL_PATHS} markers={[pointMarker, regionMarker]} />);

        // call count = original call + again for each marker + 1 more because markers are updated with a small delay
        expect(fitBoundsMock).toHaveBeenCalledTimes(3);
    });

    it('should fit to default center and zoom if markers removed', () => {
        const view = render(<Map markers={[pointMarker, regionMarker]} />);
        view.rerender(<Map defaultHighlight={NL_PATHS} markers={[]} />);

        expect(setZoomMock).toHaveBeenCalledTimes(1);
        expect(setCenterMock).toHaveBeenCalledTimes(1);
    });

    it('should add highlighted areas when geoJson objects are passed as markers', () => {
        render(<Map markers={[FR_FRIESLAND as RegionArea]} />);

        expect(addGeoJsonMock).toHaveBeenCalledTimes(1);
        expect(setZoomMock).toHaveBeenCalledTimes(1);
        expect(setCenterMock).toHaveBeenCalledTimes(1);
    });

    it('should recenter the map and change zoom when geoJson objects are replaced by regular markers', () => {
        const view = render(<Map markers={[FR_FRIESLAND as RegionArea]} />);

        expect(setZoomMock).toHaveBeenCalledTimes(1);
        expect(setCenterMock).toHaveBeenCalledTimes(1);

        view.rerender(<Map defaultHighlight={NL_PATHS} markers={[pointMarker, regionMarker]} />);

        expect(setZoomMock).toHaveBeenCalledTimes(2);
        expect(setCenterMock).toHaveBeenCalledTimes(2);
    });

    it('should add default highlight when geoJson markers are reset', () => {
        const view = render(<Map defaultHighlight={NL_PATHS} markers={[FR_FRIESLAND]} />);

        expect(addGeoJsonMock).toHaveBeenCalledTimes(1);

        view.rerender(<Map defaultHighlight={NL_PATHS} markers={[]} />);

        expect(addGeoJsonMock).toHaveBeenCalledTimes(2);
    });
});
