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
import DR_DRENTHE from '../../../../stories/static/nl_geo/DR_Drenthe.json';
import FL_FLEVOLAND from '../../../../stories/static/nl_geo/FL_Flevoland.json';
import FR_FRIESLAND from '../../../../stories/static/nl_geo/FR_Friesland.json';
import GE_GELDERLAND from '../../../../stories/static/nl_geo/GE_Gelderland.json';

stabGoogleApi();

describe('<Map/> that renders a Map with markers', () => {
    const regionMarker = {
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

        wrapper.setProps({ markers: [pointMarker, regionMarker] });
        // will be called as many times as the length of the returned array from addGeoJsonMock
        expect(removeDataMock).toHaveBeenCalledTimes(1);
    });
    it('should render with markers', () => {
        const wrapper = mount(<Map markers={[pointMarker, regionMarker]} />);
        expect(wrapper.find('Marker')).toHaveLength(2);
        expect(wrapper.find('Circle')).toHaveLength(1);
    });
    it('should fit map to markers', () => {
        mount(<Map markers={[pointMarker, regionMarker]} />);
        // call fitBounds for each marker
        expect(fitBoundsMock).toHaveBeenCalledTimes(2);
    });
    it('should fit map when new marker is added', () => {
        const wrapper = mount(<Map markers={[pointMarker]} />);
        expect(fitBoundsMock).toHaveBeenCalledTimes(1);
        wrapper.setProps({ markers: [pointMarker, regionMarker] });
        // call count = original call + again for each marker + 1 more because markers are updated with a small delay
        expect(fitBoundsMock).toHaveBeenCalledTimes(4);
    });
    it('should fit to default center and zoom if markers removed', () => {
        const wrapper = mount(<Map markers={[pointMarker, regionMarker]} />);
        wrapper.setProps({ markers: [] });
        expect(setZoomMock).toHaveBeenCalledTimes(1);
        expect(setCenterMock).toHaveBeenCalledTimes(1);
    });
    it('should add highlighted areas when geoJson objects are passed as markers', () => {
        mount(<Map markers={[DR_DRENTHE, FL_FLEVOLAND, FR_FRIESLAND, GE_GELDERLAND]} />);
        expect(addGeoJsonMock).toHaveBeenCalledTimes(4);
        expect(setZoomMock).toHaveBeenCalledTimes(1);
        expect(setCenterMock).toHaveBeenCalledTimes(1);
    });
    it('should recenter the map and change zoom when geoJson objects are replaced by regular markers', () => {
        const wrapper = mount(
            <Map markers={[DR_DRENTHE, FL_FLEVOLAND, FR_FRIESLAND, GE_GELDERLAND]} />
        );
        expect(setZoomMock).toHaveBeenCalledTimes(1);
        expect(setCenterMock).toHaveBeenCalledTimes(1);
        wrapper.setProps({ markers: [pointMarker, regionMarker] });
        expect(setZoomMock).toHaveBeenCalledTimes(2);
        expect(setCenterMock).toHaveBeenCalledTimes(2);
    });
    it('should center map when geoJson objects are used as markers', () => {
        mount(<Map markers={[DR_DRENTHE, FL_FLEVOLAND, FR_FRIESLAND, GE_GELDERLAND]} />);
        expect(setCenterMock).toHaveBeenCalledTimes(1);
    });
    it('should add default highlight when geoJson markers are reset', () => {
        const wrapper = mount(
            <Map
                defaultHighlight={NL_PATHS}
                markers={[DR_DRENTHE, FL_FLEVOLAND, FR_FRIESLAND, GE_GELDERLAND]}
            />
        );
        expect(addGeoJsonMock).toHaveBeenCalledTimes(4);
        wrapper.setProps({ markers: [] });
        expect(addGeoJsonMock).toHaveBeenCalledTimes(5);
    });
});
