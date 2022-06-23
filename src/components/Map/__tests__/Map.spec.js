import * as React from 'react';
import toJson from 'enzyme-to-json';
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
import { Map } from '..';
import NL_PATHS from '../../../../stories/static/gadm36_NLD_0.json';
import FR_FRIESLAND from '../../../../stories/static/FR_Friesland.json';

stabGoogleApi();

describe('<Map/> that renders a Map with markers', () => {
    const circleMarker = {
        center: {
            lat: 52.3922288,
            lng: 4.9338793,
        },
        radius: 30000,
    };
    const pointMarker = {
        center: {
            lat: 52.5112671,
            lng: 7.2535521,
        },
    };

    it('should render with default props', () => {
        const wrapper = mount(<Map />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should set center and zoom when rendered with default props', () => {
        mount(<Map />);
        expect(setZoomMock).toHaveBeenCalledTimes(1);
        expect(setCenterMock).toHaveBeenCalledTimes(1);
    });
    it('should fit bounds when rendered with defaultArea as address', () => {
        geocodeMock.mockImplementationOnce((req, cb) => {
            cb(geocodeResponse.results, geocodeResponse.status);
        });
        mount(<Map defaultArea={{ address: 'nl' }} />);
        expect(geocodeMock).toHaveBeenCalledTimes(1);
        expect(fitBoundsMock).toHaveBeenCalledTimes(1);
    });
    it('should add default highlight', () => {
        mount(<Map defaultHighlight={NL_PATHS} />);
        expect(addGeoJsonMock).toHaveBeenCalledTimes(1);
    });
    it('should remove default highlight when markers added', () => {
        const wrapper = mount(<Map defaultHighlight={NL_PATHS} />);
        expect(addGeoJsonMock).toHaveBeenCalledTimes(1);

        wrapper.setProps({ circularMarkers: [pointMarker, circleMarker] });
        // will be called as many times as the length of the returned array from addGeoJsonMock
        expect(removeDataMock).toHaveBeenCalledTimes(1);
    });
    it('should render with markers', () => {
        const wrapper = mount(<Map circularMarkers={[pointMarker, circleMarker]} />);
        expect(wrapper.find('Marker')).toHaveLength(2);
        expect(wrapper.find('Circle')).toHaveLength(1);
    });
    it('should fit map to markers', () => {
        mount(<Map circularMarkers={[pointMarker, circleMarker]} />);
        // call fitBounds for each marker
        expect(fitBoundsMock).toHaveBeenCalledTimes(1);
    });
    it('should fit map when new marker is added', () => {
        const wrapper = mount(<Map circularMarkers={[pointMarker]} />);
        expect(fitBoundsMock).toHaveBeenCalledTimes(1);
        wrapper.setProps({ circularMarkers: [pointMarker, circleMarker] });
        expect(fitBoundsMock).toHaveBeenCalledTimes(2);
    });
    it('should fit to default center and zoom if markers removed', () => {
        const wrapper = mount(<Map circularMarkers={[pointMarker, circleMarker]} />);
        wrapper.setProps({ circularMarkers: [] });
        expect(setZoomMock).toHaveBeenCalledTimes(1);
        expect(setCenterMock).toHaveBeenCalledTimes(1);
    });
    it.skip('should add highlighted areas when region areas are passed', () => {
        mount(<Map regionAreas={[FR_FRIESLAND]} />);
        expect(addGeoJsonMock).toHaveBeenCalledTimes(1);
        expect(setZoomMock).toHaveBeenCalledTimes(1);
        expect(setCenterMock).toHaveBeenCalledTimes(1);
    });
    it.skip('should recenter the map and change zoom when geoJson objects are replaced by regular markers', () => {
        const wrapper = mount(<Map regionAreas={[FR_FRIESLAND]} />);
        expect(setZoomMock).toHaveBeenCalledTimes(1);
        expect(setCenterMock).toHaveBeenCalledTimes(1);
        wrapper.setProps({ circularMarkers: [pointMarker, circleMarker], regionAreas: [] });
        expect(setZoomMock).toHaveBeenCalledTimes(2);
        expect(setCenterMock).toHaveBeenCalledTimes(2);
    });
    it.skip('should add default highlight when geoJson markers are reset', () => {
        const wrapper = mount(<Map defaultHighlight={NL_PATHS} regionAreas={[FR_FRIESLAND]} />);
        expect(addGeoJsonMock).toHaveBeenCalledTimes(1);
        wrapper.setProps({ regionAreas: [] });
        expect(addGeoJsonMock).toHaveBeenCalledTimes(2);
    });
});
