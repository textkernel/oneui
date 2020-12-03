import React from 'react';
import toJson from 'enzyme-to-json';
import {
    fitBoundsMock,
    setZoomMock,
    setCenterMock,
    geocodeMock,
    stabGoogleApi,
} from '../../../__mocks__/googleApiMock';
import { geocodeResponse } from '../__mocks__/geocodeResponse';
import { Map } from '..';

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
        // call count = original call + again for each marker
        expect(fitBoundsMock).toHaveBeenCalledTimes(3);
    });
    it('should fit to default center and zoom if markers removed', () => {
        const wrapper = mount(<Map markers={[pointMarker, regionMarker]} />);
        wrapper.setProps({ markers: [] });
        expect(setZoomMock).toHaveBeenCalledTimes(1);
        expect(setCenterMock).toHaveBeenCalledTimes(1);
    });
});
